import { Erc20 } from "abi/ethers-contracts";
import { BigNumber, Contract } from "ethers";
import { SwapRouter } from "ethers-contracts/SwapRouter";
import { parseUnits } from "ethers/lib/utils";
import { multiply } from "precise-math";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { Web3Domains } from "../BlockChain/Web3/selectors";
import checkAndApproveTokenForTrade from "../utils/checkAndApproveTokenForTrade";
import { getProviderOrSigner } from "../utils/contractUtils";
import { SWAP_ROUTER_FEE } from "./constants";
import { SwapDomains } from "./selectors";
import { SwapActions } from "./slice";
import { BestPath, ContainerState, FindBestPathPayload } from "./types";

// import { actions } from './slice';

export function* findBestPath(action: {
  type: string;
  payload: FindBestPathPayload;
}) {
  try {
    yield put(SwapActions.setIsGettingBestPath(true));
    const swapRouterAddress = yield select(SwapDomains.swapRouterAddress);
    const swapRouterABI = yield select(SwapDomains.swapRouterABI);
    const { amountToGive, toTokenSymbol, fromTokenSymbol } = action.payload;
    const tokens = yield select(SwapDomains.swapTokens);
    const fromTokenAddress = tokens[fromTokenSymbol].address;
    const toTokenAddress = tokens[toTokenSymbol].address;
    const library = yield select(Web3Domains.selectLibraryDomain);
    const account = yield select(Web3Domains.selectAccountDomain);

    const swapContract = new Contract(
      swapRouterAddress,
      swapRouterABI,
      getProviderOrSigner(library, account)
    );
    const gasEstimate = yield call(
      swapContract.estimateGas.findBestPathWithGas,
      amountToGive,
      fromTokenAddress,
      toTokenAddress,
      1,
      BigNumber.from(225)
    );
    const additional = multiply(Number(gasEstimate.toString()), 0.2).toFixed(0);
    const optimalPath = yield call(
      swapContract.findBestPathWithGas,
      amountToGive,
      fromTokenAddress,
      toTokenAddress,
      1,
      BigNumber.from(225),
      { gasLimit: (Number(gasEstimate) + Number(additional)).toString() }
    );
    yield all([
      put(SwapActions.setBestPath(optimalPath)),
      put(SwapActions.setIsGettingBestPath(false)),
    ]);
  } catch (error) {
    console.log(error);
    yield put(SwapActions.setIsGettingBestPath(false));
  }
}
export function* swap() {
  try {
    yield put(SwapActions.setIsSwapping(true));
    const library = yield select(Web3Domains.selectLibraryDomain);
    const account = yield select(Web3Domains.selectAccountDomain);
    const bestPath: BestPath = yield select(SwapDomains.bestPath);
    const tokens: ContainerState["tokens"] = yield select(
      SwapDomains.swapTokens
    );
    const tokensList = Object.values(tokens);
    const swapRouterAddress = yield select(SwapDomains.swapRouterAddress);
    const swapRouterABI = yield select(SwapDomains.swapRouterABI);
    const swapRouterContract: SwapRouter = new Contract(
      swapRouterAddress,
      swapRouterABI,
      getProviderOrSigner(library, account)
    ) as SwapRouter;
    const infiniteApproval = yield select(SwapDomains.infiniteApproval);
    const fromTokenAddress = bestPath.path[0];
    const fromTokenABI = tokensList.find(
      (token) => token.address === fromTokenAddress
    )?.ABI;
    const fromTokenContract = new Contract(
      fromTokenAddress,
      fromTokenABI,
      getProviderOrSigner(library, account)
    );
    const amountToReceive = bestPath.amounts[bestPath.amounts.length - 1];
    const amountToGive = bestPath.amounts[0];

    yield call(
      checkAndApproveTokenForTrade,
      fromTokenContract as Erc20,
      swapRouterAddress,
      account,
      amountToGive,
      infiniteApproval,
      parseUnits("45", 9), //gasPrice
      {
        onTransactionError: () => {
          throw new Error("Your transaction could not be completed");
        },
      }
    );
    const swapData = {
      amountIn: amountToGive,
      amountOut: amountToReceive,
      path: bestPath.path,
      adapters: bestPath.adapters,
    };
    const swapTransaction = yield call(
      swapRouterContract.swapNoSplit,
      swapData,
      account,
      SWAP_ROUTER_FEE
    );
    const result = yield call(swapTransaction?.wait);
    if (result.status) {
      toast.success("Swap Successful");
    }
    yield put(SwapActions.setIsSwapping(false));
  } catch (error) {
    console.log(error);
    yield put(SwapActions.setIsSwapping(false));
  }
}

export function* swapSaga() {
  yield takeLatest(SwapActions.findBestPath.type, findBestPath);
  yield takeLatest(SwapActions.swap.type, swap);
}

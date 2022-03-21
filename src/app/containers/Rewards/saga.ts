// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { GlobalDomains } from "app/appSelectors";
import { tokens } from "app/tokens";
import { BigNumber, Contract } from "ethers";
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { Web3Domains } from "../BlockChain/Web3/selectors";
import { getContract, getProviderOrSigner } from "../utils/contractUtils";
import {
  ContractCall,
  getMultiContractData,
  getUserMasterchefInfo,
} from "../utils/multicall";
import { fetchSwapStatsNow } from "./providers/getSwapStats";
import { getVaultRewardAprNow } from "./providers/getVaultRewardsAPR";
import { RewardsDomains } from "./selectors";
import { RewardsActions } from "./slice";
import {
  ApproveAndDepositPayload,
  ApproveAndWithdrawPayload,
  MasterchefResponse,
  Pool,
  Pools,
  RewardsState,
  WithdrawType,
} from "./types";
import LPTOKEN_UNGUARDED_ABI from "abi/lpTokenUnguarded.json";
import { calculatePoolData } from "./utils/calculatePoolData";
import { LpTokenUnguarded } from "abi/ethers-contracts/LpTokenUnguarded";
import { GenericGasResponse } from "app/providers/gasPrice";
import { Token, TokenSymbols } from "../Swap/types";
import { AXIAL_MASTERCHEF_CONTRACT_ADDRESS } from "./constants";
import MASTERCHEF_ABI from "abi/masterchef.json";
import { parseUnits } from "@ethersproject/units";
import checkAndApproveTokenForTrade from "../utils/checkAndApproveTokenForTrade";
import { SwapDomains } from "../Swap/selectors";
import { Erc20, SwapFlashLoanNoWithdrawFee } from "abi/ethers-contracts";
import { IS_DEV } from "environment";
import { addSlippage, Slippages, subtractSlippage } from "./utils/slippage";
import { Deadlines, formatDeadlineToNumber } from "./utils/deadline";
import { BNToString } from "common/format";
import { formatUnits } from "ethers/lib/utils";
export function* getRewardPoolsData(action: {
  type: string;
  payload: RewardsState["pools"];
}) {
  yield put(RewardsActions.setRewardPools(action.payload));
  const pools: RewardsState["pools"] = yield select(RewardsDomains.pools);
  const networkLibrary = yield select(Web3Domains.selectNetworkLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const chainId = yield select(Web3Domains.selectChainIDDomain);
  const tokenPricesUSD = yield select(GlobalDomains.tokenPricesUSD);

  try {
    const poolKeys: Pools[] = [];
    const arrayOfDataGetters = Object.values(pools).map((pool: any) => {
      poolKeys.push(pool.key);
      const dataToPass = {
        pool,
        account,
        chainId,
        library: networkLibrary,
        tokenPricesUSD,
      };
      return call(calculatePoolData, dataToPass);
    });
    const responses = yield all(arrayOfDataGetters);
    const tmpPools = {};
    poolKeys.forEach((key: Pools, index) => {
      //because some pools like AXIAL_JLP dont have a response
      tmpPools[key] = {
        ...pools[key],
        ...(responses[index] && responses[index]),
      };
    });
    yield put(RewardsActions.setRewardPools(tmpPools));
  } catch (error) {
    console.log(error);
  }
}

export function* getMasterChefBalances() {
  const chainId = yield select(Web3Domains.selectChainIDDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const library = yield select(Web3Domains.selectLibraryDomain);

  try {
    yield put(RewardsActions.setIsGettingMasterChefBalances(true));
    const tokensList = Object.values(tokens).filter((token) => token.isLPToken);
    const masterchefBalancesCall: ContractCall[] = [];
    const tokenAddressList: string[] = [];
    tokensList.forEach((token) => {
      if (token.isLPToken && token.masterchefId !== undefined) {
        masterchefBalancesCall.push(
          getUserMasterchefInfo(account, token.masterchefId, chainId)
        );
        tokenAddressList.push(token.address);
      }
    });
    const balanceResponses = yield call(
      getMultiContractData,
      library,
      masterchefBalancesCall,
      tokenAddressList
    );

    const _info: MasterchefResponse = {
      userInfo: {
        amount: BigNumber.from("0"),
        rewardDebt: BigNumber.from("0"),
      },
      pendingTokens: {
        bonusTokenAddress: "",
        bonusTokenSymbol: "",
        pendingAxial: BigNumber.from("0"),
        pendingBonusToken: BigNumber.from("0"),
      },
    };

    const balances = tokensList.reduce(
      (acc, t) => ({
        ...acc,
        [t.symbol]: {
          userInfo: {
            amount: balanceResponses[t.address]?.userInfo[0],
            rewardDebt: balanceResponses[t.address]?.userInfo[1],
          },
          pendingTokens: {
            pendingAxial: balanceResponses[t.address]?.pendingTokens[0],
            bonusTokenAddress: balanceResponses[t.address]?.pendingTokens[1],
            bonusTokenSymbol: balanceResponses[t.address]?.pendingTokens[2],
            pendingBonusToken: balanceResponses[t.address]?.pendingTokens[3],
          },
        },
      }),
      { _info: _info }
    );
    yield all([
      put(RewardsActions.setMasterChefBalances(balances)),
      put(RewardsActions.setIsGettingMasterChefBalances(false)),
    ]);
  } catch (e) {
    yield put(RewardsActions.setIsGettingMasterChefBalances(false));
    console.log(e);
  }
}

export function* getMasterchefAPR() {
  try {
    yield put(RewardsActions.setIsGettingMasterchefApr(true));
    const aprData = yield call(getVaultRewardAprNow);
    yield put(RewardsActions.setMasterChefAPR(aprData));
    yield put(RewardsActions.setIsGettingMasterchefApr(false));
  } catch (e) {
    console.log(e);
    yield put(RewardsActions.setIsGettingMasterchefApr(false));
  }
}
export function* getSwapStats() {
  try {
    yield put(RewardsActions.setIsGettingSwapStats(true));
    const stats = yield call(fetchSwapStatsNow);
    yield put(RewardsActions.setSwapStats(stats));
    yield put(RewardsActions.setIsGettingSwapStats(false));
  } catch (e) {
    console.log(e);
    yield put(RewardsActions.setIsGettingSwapStats(false));
  }
}

export function* approveSingleToken({
  token,
  swapAddress,
  gasPrice,
  amount,
}: {
  token: Token;
  swapAddress: string;
  gasPrice: BigNumber;
  amount: BigNumber;
}) {
  try {
    const library = yield select(Web3Domains.selectLibraryDomain);
    const account = yield select(Web3Domains.selectAccountDomain);
    const infiniteApproval = yield select(GlobalDomains.infiniteApproval);
    const tokenContract = new Contract(
      token.address,
      token.ABI,
      getProviderOrSigner(library, account)
    );
    yield call(
      checkAndApproveTokenForTrade,
      tokenContract as Erc20,
      swapAddress,
      account,
      amount,
      infiniteApproval,
      gasPrice,
      {
        onTransactionError: () => {
          throw new Error("Your transaction could not be completed");
        },
      }
    );
    yield put(
      RewardsActions.setApprovalForTokenInQueue({
        tokenSymbol: token.symbol as TokenSymbols,
        approved: true,
      })
    );
  } catch (e) {
    console.log(e);
    yield put(
      RewardsActions.setApprovalForTokenInQueue({
        tokenSymbol: token.symbol as TokenSymbols,
        approved: false,
      })
    );
  }
}

export function* resetTokensInQueueForApproval(tokenSymbols: TokenSymbols[]) {
  for (let i = 0; i < tokenSymbols.length; i++) {
    const tokenSymbol = tokenSymbols[i];
    yield put(
      RewardsActions.setApprovalForTokenInQueue({
        tokenSymbol: tokenSymbol as TokenSymbols,
        approved: false,
      })
    );
  }
}

export function* approveAndDeposit(action: {
  type: string;
  payload: ApproveAndDepositPayload;
}) {
  const { poolName, masterchefDeposit, tokenAmounts } = action.payload;
  const pools = yield select(RewardsDomains.pools);
  const pool: Pool = pools[poolName];

  const shouldDepositWrapped = pool.swapAddress === undefined ? false : true;

  const poolTokens = shouldDepositWrapped
    ? (pool.underlyingPoolTokens as Token[])
    : masterchefDeposit
    ? [pool.lpToken]
    : pool.poolTokens;
  const tokenSymbols = poolTokens.map(
    (token) => token.symbol
  ) as TokenSymbols[];
  yield put(RewardsActions.emptyTokensInQueueForApproval());
  yield call(resetTokensInQueueForApproval, tokenSymbols);

  try {
    yield put(RewardsActions.setIsDepositing(true));
    const slipage = Slippages.OneTenth;
    const transactionDeadline = Deadlines.Twenty;

    const library = yield select(Web3Domains.selectLibraryDomain);
    const account = yield select(Web3Domains.selectAccountDomain);
    const targetContract = new Contract(
      pool.swapAddress || pool.address,
      pool.swapABI,
      getProviderOrSigner(library, account)
    );

    const masterchefContract = new Contract(
      AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
      MASTERCHEF_ABI,
      library?.getSigner()
    );

    const lpTokenContract = getContract(
      pool.lpToken.address,
      LPTOKEN_UNGUARDED_ABI,
      library,
      account ?? undefined
    ) as LpTokenUnguarded;

    const gasPrices: GenericGasResponse = yield select(GlobalDomains.gasPrice);
    const { gasFast, gasInstant, gasStandard } = gasPrices;
    const gasPrice = parseUnits(String(gasFast) || "45", 9);
    if (IS_DEV) {
      for (const token of poolTokens) {
        yield call(approveSingleToken, {
          token,
          swapAddress: pool.swapAddress || pool.address,
          gasPrice,
          amount: tokenAmounts[token.symbol],
        });
      }
    } else {
      const callArray: any = [];
      for (const token of poolTokens) {
        callArray.push(
          call(approveSingleToken, {
            token,
            swapAddress: pool.swapAddress || pool.address,
            gasPrice,
            amount: tokenAmounts[token.symbol],
          })
        );
      }
      yield all(callArray);
    }
    if (!masterchefDeposit) {
      if (!lpTokenContract) return;
      const totalSupply = yield call(lpTokenContract.totalSupply);
      const isFirstTransaction = totalSupply.isZero();
      let minToMint: BigNumber;

      if (isFirstTransaction) {
        minToMint = BigNumber.from("0");
      } else {
        minToMint = yield call(
          (targetContract as SwapFlashLoanNoWithdrawFee).calculateTokenAmount,
          poolTokens.map(({ symbol }) => tokenAmounts[symbol]),
          true
        );
      }

      minToMint = subtractSlippage(minToMint, slipage);

      const deadline = formatDeadlineToNumber(transactionDeadline);
      const txnAmounts = poolTokens.map(({ symbol }) => {
        const amount = tokenAmounts[symbol].toString();
        return amount;
      });

      const txnDeadline = Math.round(
        new Date().getTime() / 1000 + 60 * deadline
      );

      const spendTransaction = yield call(
        (targetContract as SwapFlashLoanNoWithdrawFee)?.addLiquidity,
        txnAmounts,
        minToMint,
        txnDeadline
      );
      yield call(spendTransaction.wait);
    } else {
      yield call(
        masterchefContract.deposit,
        pool.lpToken.masterchefId,
        tokenAmounts[pool.lpToken.symbol]
      );
    }
    yield put(RewardsActions.setIsDepositing(false));
  } catch (e) {
    console.log(e);
    yield put(RewardsActions.setIsDepositing(false));
    yield call(resetTokensInQueueForApproval, tokenSymbols);
  } finally {
    yield call(resetTokensInQueueForApproval, tokenSymbols);
  }
}

export function* approveAndWithdraw(action: {
  type: string;
  payload: ApproveAndWithdrawPayload;
}) {
  const slipage = Slippages.OneTenth;
  const transactionDeadline = Deadlines.Twenty;
  const infiniteApproval = yield select(GlobalDomains.infiniteApproval);
  const pools = yield select(RewardsDomains.pools);
  const library = yield select(Web3Domains.selectLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const tokens = yield select(GlobalDomains.tokens);
  const {
    poolName,
    tokenAmounts,
    masterchefwithdraw,
    type,
    lpTokenAmountToSpend,
  } = action.payload;
  const pool: Pool = pools[poolName];
  const { userShareData } = pool;

  const targetContract = new Contract(
    pool.address,
    pool.swapABI,
    getProviderOrSigner(library, account)
  );
  const gasPrices: GenericGasResponse = yield select(GlobalDomains.gasPrice);
  const { gasFast, gasInstant, gasStandard } = gasPrices;
  const masterchefContract = new Contract(
    AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
    MASTERCHEF_ABI,
    library?.getSigner()
  );
  const lpTokenContract = getContract(
    pool.lpToken.address,
    LPTOKEN_UNGUARDED_ABI,
    library,
    account ?? undefined
  ) as LpTokenUnguarded;
  const gasPrice = parseUnits(String(gasFast) || "45", 9);
  if (!masterchefwithdraw) {
    const allowanceAmount =
      type === WithdrawType.IMBALANCE
        ? addSlippage(lpTokenAmountToSpend, slipage)
        : lpTokenAmountToSpend;
    yield call(
      checkAndApproveTokenForTrade,
      lpTokenContract as LpTokenUnguarded,
      pool.swapAddress || pool.address,
      account,
      allowanceAmount,
      infiniteApproval,
      gasPrice,
      {
        onTransactionError: () => {
          throw new Error("Your transaction could not be completed");
        },
      }
    );
    console.debug(
      `lpTokenAmountToSpend: ${formatUnits(lpTokenAmountToSpend, 18)}`
    );
    const deadline = Math.round(
      new Date().getTime() / 1000 +
        60 * formatDeadlineToNumber(transactionDeadline)
    );
    let spendTransaction;

    if (type === WithdrawType.ALL) {
      spendTransaction = yield call(
        targetContract.removeLiquidity,
        lpTokenAmountToSpend,
        pool.poolTokens.map(({ symbol }) =>
          subtractSlippage(BigNumber.from(tokenAmounts[symbol]), slipage)
        ),
        deadline
      );
    } else if (type === "IMBALANCE") {
      spendTransaction = yield call(
        targetContract.removeLiquidityImbalance,
        pool.poolTokens.map(({ symbol }) => tokenAmounts[symbol]),
        addSlippage(lpTokenAmountToSpend, slipage),
        deadline
      );
    } else {
      spendTransaction = yield call(
        targetContract.removeLiquidityOneToken,
        lpTokenAmountToSpend,
        pool.poolTokens.findIndex(({ symbol }) => symbol === type),
        subtractSlippage(tokenAmounts[type], slipage),
        deadline
      );
    }

    yield call(spendTransaction.wait);
  } else {
    yield call(
      masterchefContract.withdraw,
      pool.lpToken.masterchefId,
      tokenAmounts[pool.lpToken.symbol]
    );
  }
}

export function* rewardsSaga() {
  yield takeLatest(RewardsActions.getRewardPoolsData.type, getRewardPoolsData);
  yield takeLatest(
    RewardsActions.getMasterChefBalances.type,
    getMasterChefBalances
  );
  yield takeLatest(RewardsActions.getMasterchefAPR.type, getMasterchefAPR);
  yield takeLatest(RewardsActions.getSwapStats.type, getSwapStats);
  yield takeLatest(RewardsActions.approveAndDeposit.type, approveAndDeposit);
  yield takeLatest(RewardsActions.approveAndWithdraw.type, approveAndWithdraw);
}

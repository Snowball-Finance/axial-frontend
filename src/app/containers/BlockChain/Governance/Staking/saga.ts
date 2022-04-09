// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { parseEther } from "ethers/lib/utils";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { StakingActions } from "./slice";
import {
  StakeGovernanceTokenModel,
  DistributorData,
  StakeAccruingTokenModel,
} from "./types";
import { Contract, ethers } from "ethers";
import { env } from "environment";
import { BlockChainActions } from "../../slice";
import { toast } from "react-toastify";
import { EthersDomains } from "../../Ethers/selectors";
import { Web3Domains } from "../../Web3/selectors";
import { StakingDomains } from "./selectors";
import { GovernanceDomains } from "../selectors";
import { BlockChainDomains } from "../../selectors";
import { GovernanceActions } from "../slice";
import { SAxial, VeAxial } from "abi/ethers-contracts";
import AccruingTokenABI from "abi/veAxial.json";

export function* stakeGovernanceToken(action: {
  type: string;
  payload: StakeGovernanceTokenModel;
}) {
  const { balance, date } = action.payload;
  const amount = parseEther(balance.toString());
  yield put(StakingActions.setIsStakingGovernanceToken(true));
  const library = yield select(Web3Domains.selectLibraryDomain);
  //|| is used because if .env is not set,we will fetch the error in early stages
  const mainTokenAddress = env.MAIN_TOKEN_ADDRESS || "";
  const mainTokenABI = yield select(BlockChainDomains.selectMainTokenABIDomain);
  try {
    const mainTokenContract = new ethers.Contract(
      mainTokenAddress,
      mainTokenABI,
      library.getSigner()
    );
    if (mainTokenContract) {
      //|| is used because if .env is not set,we will fetch the error in early stages
      const governanceTokenAddress =
        env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS || "";
      const governanceTokenABI = yield select(
        GovernanceDomains.selectGovernanceTokenABIDomain
      );
      const governanceTokenContract: SAxial = new Contract(
        governanceTokenAddress,
        governanceTokenABI,
        library.getSigner()
      ) as SAxial;

      const approveGovernanceTokenContractHasAccessToMainTokenAssets =
        // yield call(checkAndApproveTokensInList,{
        //   tokensToVerify:[
        //     {
        //       token:{
        //         symbol:env.GOVERNANCE_TOKEN_NAME
        //       }as Token,
        //       swapAddress:governanceTokenAddress,
        //       tokenContract:mainTokenContract,
        //       amount:ethers.constants.MaxUint256

        //     }
        //   ]
        // })
        yield call(
          mainTokenContract.approve,
          governanceTokenAddress,
          ethers.constants.MaxUint256
        );
      const transactionApproveResponse = yield call(
        approveGovernanceTokenContractHasAccessToMainTokenAssets.wait,
        1
      );
      if (!transactionApproveResponse.status) {
        console.debug("transaction not approved");
        return;
      }

      const endDate = new Date(date);
      var startDate = new Date();
      var timeFromNow = (endDate.getTime() - startDate.getTime()) / 1000;
      /**
       *      _duration: BigNumberish,
              _amount: BigNumberish,
              _deferUnclaimed: boolean,
       */
      const tokenLock = yield call(
        governanceTokenContract.stake,
        timeFromNow,
        amount,
        false
      );

      const transactionResponse = yield call(tokenLock.wait, 1);
      if (transactionResponse.status) {
        yield all([
          put(BlockChainActions.getMainTokenBalance()),
          put(BlockChainActions.getGovernanceTokenBalance()),
          put(GovernanceActions.getGovernanceTokenBalance()),
          put(StakingActions.getLockedGovernanceTokenInfo()),
        ]);
      }
    } else {
      toast("Main Token Contract is not set");
    }
  } catch (error: any) {
    console.debug(error);
    if (error?.data?.message) {
      toast.error(error.data.message);
    }
  } finally {
    yield put(StakingActions.setIsStakingGovernanceToken(false));
  }
}

export function* claim() {
  const account = yield select(Web3Domains.selectAccountDomain);
  if (!account) {
    toast.warn("connect to your wallet please");
    return;
  }
  const feeDistributorABI = yield select(
    StakingDomains.selectFeeDistributorABIDomain
  );
  const library = yield select(Web3Domains.selectLibraryDomain);
  const otherDistributors = yield select(
    StakingDomains.selectOtherDistributorsDomain
  );
  try {
    yield put(StakingActions.setIsClaiming(true));
    const feeDistributorContract = new ethers.Contract(
      // || '' is used because if .env is not set,we will fetch the error in early stages
      env.FEE_DISTRIBUTOR_CONTRACT_ADDRESS || "",
      feeDistributorABI,
      library.getSigner()
    );
    const gasLimit = yield call(feeDistributorContract.estimateGas["claim()"]);
    const tokenClaim = yield call(feeDistributorContract["claim()"], {
      gasLimit,
    });
    const transactionResponse = yield call(tokenClaim.wait, 1);
    if (transactionResponse.status && otherDistributors) {
      const tmp = {};
      for (let i = 0; i < otherDistributors.length; i++) {
        const element: DistributorData = otherDistributors[i];
        const contract = new ethers.Contract(
          element.address,
          feeDistributorABI,
          library.getSigner()
        );
        tmp[element.name] = yield call(
          contract.callStatic["claim(address)"],
          account,
          { gasLimit: 1000000 }
        );
      }
      yield put(
        StakingActions.setOtherClaimables({
          ...tmp,
        })
      );
    }
  } catch (error) {
    console.debug(error);
  } finally {
    yield put(StakingActions.setIsClaiming(false));
  }
}

export function* getFeeDistributionInfo() {
  const library = yield select(Web3Domains.selectLibraryDomain);
  try {
    yield put(StakingActions.setIsGettingFeeDistributionInfo(true));
    const account = yield select(Web3Domains.selectAccountDomain);
    const feeDistributorABI = yield select(
      StakingDomains.selectFeeDistributorABIDomain
    );
    const feeDistributorContract = new ethers.Contract(
      // || '' is used because if .env is not set,we will fetch the error in early stages
      env.FEE_DISTRIBUTOR_CONTRACT_ADDRESS || "",
      feeDistributorABI,
      library.getSigner()
    );
    const userClaimable = yield call(
      feeDistributorContract.callStatic["claim(address)"],
      account,
      { gasLimit: 1000000 }
    );
    yield put(StakingActions.setUserClaimable(userClaimable));
  } catch (error) {
    console.debug(error);
  } finally {
    yield put(StakingActions.setIsGettingFeeDistributionInfo(false));
  }
}

export function* getLockedGovernanceTokenInfo() {
  const governanceTokenABI = yield select(
    GovernanceDomains.selectGovernanceTokenABIDomain
  );
  const provider = yield select(EthersDomains.selectPrivateProviderDomain);
  const governanceTokenContract = new ethers.Contract(
    env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS || "",
    governanceTokenABI,
    provider
  );
  const account = yield select(Web3Domains.selectAccountDomain);
  try {
    yield put(StakingActions.setIsGettingGovernanceTokenInfo(true));
    const info = yield call(governanceTokenContract.locked, account, {
      gasLimit: 1000000,
    });
    yield put(StakingActions.setGovernanceTokenInfo(info));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(StakingActions.setIsGettingGovernanceTokenInfo(false));
  }
}

export function* withdraw() {
  yield put(StakingActions.setIsWithdrawingGovernanceToken(true));

  try {
    const governanceTokenABI = yield select(
      GovernanceDomains.selectGovernanceTokenABIDomain
    );
    const library = yield select(Web3Domains.selectLibraryDomain);
    const snowconeContractWithdraw = new ethers.Contract(
      env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS || "",
      governanceTokenABI,
      library.getSigner()
    );
    const gasLimit = yield call(snowconeContractWithdraw.estimateGas.withdraw);
    const tokenWithdraw = yield call(snowconeContractWithdraw.withdraw, {
      gasLimit,
    });
    const transactionWithdraw = yield call(tokenWithdraw.wait, 1);

    if (transactionWithdraw.status) {
      yield all([
        put(BlockChainActions.getMainTokenBalance()),
        put(BlockChainActions.getGovernanceTokenBalance()),
      ]);
    }
  } catch (e: any) {
    console.debug(e);
    if (e?.data?.message) {
      toast.error(e.data.message);
    }
  } finally {
    yield put(StakingActions.setIsWithdrawingGovernanceToken(false));
  }
}

export function* stakeAccruingToken(action: {
  type: string;
  payload: StakeAccruingTokenModel;
}) {
  try {
    const library = yield select(Web3Domains.selectLibraryDomain);
    const accruingTokenAddress =
      process.env.REACT_APP_ACCRUING_TOKEN_ADDRESS || "";
    const accruingTokenContract: VeAxial = new Contract(
      accruingTokenAddress,
      AccruingTokenABI,
      library.getSigner()
    ) as VeAxial;

    const { amountToStake } = action.payload;
    const transaction = yield call(accruingTokenContract.stake, amountToStake);
    yield call(transaction.wait, 1);
    if (transaction.status) {
      toast.success("staking successful");
    }
  } catch (e) {
    toast.error("error while staking");
  }
}

export function* stakingSaga() {
  yield takeLatest(
    StakingActions.stakeGovernanceToken.type,
    stakeGovernanceToken
  );
  yield takeLatest(StakingActions.stakeAccruingToken.type, stakeAccruingToken);
  yield takeLatest(StakingActions.claim.type, claim);
  yield takeLatest(
    StakingActions.getFeeDistributionInfo.type,
    getFeeDistributionInfo
  );
  yield takeLatest(
    StakingActions.getLockedGovernanceTokenInfo.type,
    getLockedGovernanceTokenInfo
  );
  yield takeLatest(StakingActions.withdraw.type, withdraw);
}

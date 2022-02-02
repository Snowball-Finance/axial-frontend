// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { parseEther } from "ethers/lib/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { StakingActions } from "./slice";
import { CreateLockData, DistributorData } from "./types";
import { ethers } from "ethers";
import { getEpochSecondForDay } from "./helpers/date";
import { selectGovernanceTokenContract } from "../selectors";
import { BlockChainActions } from "../../slice";
import { toast } from "react-toastify";

import {
  selectFeeDistributorABIDomain,
  selectOtherDistributorsDomain,
} from "./selectors";
import { selectAccountDomain, selectLibraryDomain } from "../../Web3/selectors";
import { selectMainTokenABIDomain } from "../../selectors";
import { env } from "../../../../environment";

export function* createLock(action: { type: string; payload: CreateLockData }) {
  const { balance, date } = action.payload;
  const amount = parseEther(balance.toString());
  yield put(StakingActions.setIsStaking(true));
  const library = yield select(selectLibraryDomain);
  //|| is used because if .env is not set,we will fetch the error in early stages
  const mainTokenAddress = env.MAIN_TOKEN_ADDRESS || "";
  const mainTokenABI = yield select(selectMainTokenABIDomain);
  try {
    const mainTokenContract = new ethers.Contract(
      mainTokenAddress,
      mainTokenABI,
      library.getSigner()
    );
    if (mainTokenContract) {
      const governanceTokenAddress = env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS;
      const approveGovernanceTokenContractHasAccessToMainTokenAssets =
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
      const lockedDate = getEpochSecondForDay(new Date(date));
      const governanceTokenContract = yield select(
        selectGovernanceTokenContract
      );
      const gasLimit = yield call(
        governanceTokenContract.estimateGas.create_lock,
        amount,
        lockedDate
      );
      const tokenLock = yield call(
        governanceTokenContract.create_lock,
        amount,
        lockedDate,
        { gasLimit }
      );
      const transactionResponse = yield call(tokenLock.wait, 1);
      if (transactionResponse.status) {
        yield put(BlockChainActions.getMainTokenBalance());
      }
    } else {
      toast("Main Token Contract is not set");
    }
  } catch (error) {
    console.debug(error);
  } finally {
    yield put(StakingActions.setIsStaking(false));
  }
}

export function* claim() {
  const account = yield select(selectAccountDomain);
  if (!account) {
    toast.warn("connect to your wallet please");
    return;
  }
  const feeDistributorABI = yield select(selectFeeDistributorABIDomain);
  const library = yield select(selectLibraryDomain);
  const otherDistributors = yield select(selectOtherDistributorsDomain);
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
  const library = yield select(selectLibraryDomain);
  try {
    yield put(StakingActions.setIsGettingFeeDistributionInfo(true));
    const account = yield select(selectAccountDomain);
    const feeDistributorABI = yield select(selectFeeDistributorABIDomain);
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

export function* stakingSaga() {
  yield takeLatest(StakingActions.createLock.type, createLock);
  yield takeLatest(StakingActions.claim.type, claim);
  yield takeLatest(
    StakingActions.getFeeDistributionInfo.type,
    getFeeDistributionInfo
  );
}

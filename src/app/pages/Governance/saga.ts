// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { Web3Domains } from "app/containers/BlockChain/Web3/selectors";
import { selectGaugeContractDomain } from "app/containers/PoolsAndGauges/selectors";
import { PoolsAndGaugesActions } from "app/containers/PoolsAndGauges/slice";
import { IS_DEV } from "environment";
import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { selectSelectedVoteAllocationPairsDomain } from "./selectors";
import { GovernancePageActions } from "./slice";
import { isPositiveNumber } from "./utils/isPositiveNumber";

export function* voteForFarms() {
  yield put(GovernancePageActions.setIsVotingForFarms(true));
  try {
    const selectedPairs = yield select(selectSelectedVoteAllocationPairsDomain);
    const gaugeProxyVoteContract = yield select(selectGaugeContractDomain);
    const library = yield select(Web3Domains.selectLibraryDomain);
    //make them weight proportional if they are not
    let pairsObject = selectedPairs;
    // const arr: GaugeItem[] = Object.values(selectedPairs)
    // let totalAllocation = 0
    // arr.forEach((item) => {
    //   pairsObject[item.address] = { ...item }
    //   if (isPositiveNumber(item.enteredAllocation)) {
    //     totalAllocation = add(totalAllocation, item.enteredAllocation)
    //   }
    // })

    // if (totalAllocation !== 100) {
    //   pairsObject = fitGaugeWeightsProportionally(pairsObject)
    // }

    //generate weights and tokens as list
    const tokenAddressList: string[] = [];
    const weightsList: number[] = [];
    for (const key in pairsObject) {
      if (Object.prototype.hasOwnProperty.call(pairsObject, key)) {
        const element = pairsObject[key];
        if (isPositiveNumber(element.enteredAllocation)) {
          tokenAddressList.push(key);
          weightsList.push(element.enteredAllocation);
        }
      }
    }

    if (tokenAddressList.length === 0) {
      toast.warn("please fill at least one allocation field");
      return;
    }

    // const adjustedWeightList = adjustValues(weightsList)
    const adjustedWeightList = weightsList.map((item) => Math.round(item));
    const gasLimit = yield call(
      gaugeProxyVoteContract.estimateGas.vote,
      tokenAddressList,
      adjustedWeightList
    );
    const signer = gaugeProxyVoteContract.connect(library.getSigner());
    const tokenVote = yield call(
      signer.vote,
      tokenAddressList,
      adjustedWeightList,
      { gasLimit }
    );
    const transactionVote = yield call(tokenVote.wait, 1);
    if (transactionVote.status) {
      toast.success("Voted successfully");
      yield put(PoolsAndGaugesActions.getInitialData());
    } else {
      toast.error("something went wrong");
    }
  } catch (error) {
    if (IS_DEV) {
      console.log(error);
    }
    toast.error("failed to vote for farms,try again later");
  } finally {
    yield put(GovernancePageActions.setIsVotingForFarms(false));
  }
}

export function* governancePageSaga() {
  yield takeLatest(GovernancePageActions.voteForFarms.type, voteForFarms);
}

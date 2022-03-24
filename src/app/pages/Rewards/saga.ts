import { Web3Domains } from "app/containers/BlockChain/Web3/selectors";
import { AXIAL_MASTERCHEF_CONTRACT_ADDRESS } from "app/containers/Rewards/constants";
import masterchef from "abi/masterchef.json"
import { ApproveAndDepositPayload, ApproveAndWithdrawPayload, Pool, WithdrawType } from "app/containers/Rewards/types";
import { floatToBN } from "common/format";
import { BigNumber, ethers } from "ethers";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { RewardsPageDomains } from "./selectors";
import { RewardsPageActions } from "./slice";

export function* deposit() {
  const selectedPool: Pool = yield select(RewardsPageDomains.pool);
  const value = yield select(RewardsPageDomains.depositValue) || "0";
  const token = selectedPool.lpToken;
  const dataToSend: ApproveAndDepositPayload = {
    poolName: selectedPool.key,
    masterchefDeposit: true,
    tokenAmounts: {
      [token.symbol]: floatToBN(Number(value), token.decimals),
    },
  };
  if (selectedPool.underlyingPoolTokens) {
    selectedPool.underlyingPoolTokens.forEach((element) => {
      dataToSend.tokenAmounts[element.symbol] = floatToBN(0, element.decimals);
    });
  }
  console.log({dataToSend})
  // yield put(RewardsActions.approveAndDeposit(dataToSend));
}

export function* withdraw(){
  const pool:Pool=yield select(RewardsPageDomains.pool)
  const amount=yield select(RewardsPageDomains.withdrawAmount)
  const dataToSend:ApproveAndWithdrawPayload={
    poolName:pool.key,
    lpTokenAmountToSpend:floatToBN(amount,pool.lpToken.decimals)||BigNumber.from('0'),
    tokenAmounts:{
      [pool.lpToken.symbol]:floatToBN(amount,pool.lpToken.decimals)||BigNumber.from('0')
    },
    type:WithdrawType.ALL,
    masterchefwithdraw:true
  }
  console.log(dataToSend)
// yield put(RewardsActions.approveAndWithdraw(dataToSend))

}

export function* claim(action:{type:string,payload:Pool}){
  const pool=action.payload
  const library=yield select(Web3Domains.selectLibraryDomain)
  const materchefContract  = new ethers.Contract(
    AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
    masterchef,
    library?.getSigner(),
  )
  try{
    yield call(materchefContract.withdraw,pool.lpToken.masterchefId,0)
  }
  catch(e){
    console.log(e)
  }
}

export function* rewardsPageSaga() {
  yield takeLatest(RewardsPageActions.deposit.type, deposit);
  yield takeLatest(RewardsPageActions.withdraw.type, withdraw);
  yield takeLatest(RewardsPageActions.claim.type, claim);
}

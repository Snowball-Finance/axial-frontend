// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { tokens } from "app/tokens";
import { Console } from "console";
import { BigNumber, Contract } from "ethers";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { Web3Domains } from "../BlockChain/Web3/selectors";
import { getProviderOrSigner } from "../utils/contractUtils";
import { ContractCall, getMultiContractData, getUserMasterchefInfo } from "../utils/multicall";
import { getVaultRewardAprNow } from "./providers/getVaultRewardsAPR";
import { RewardsActions } from "./slice";
import { MasterchefResponse, RewardsState } from "./types";

export function* getRewardPoolsData(action: { type: string, payload: RewardsState['pools'] }) {
  const pools = { ...action.payload };
  const library = yield select(Web3Domains.selectLibraryDomain)
  const account = yield select(Web3Domains.selectAccountDomain)
  for (const key in pools) {
    if (Object.prototype.hasOwnProperty.call(pools, key)) {
      const pool: any = pools[key];
      const contract = new Contract(pool.address, pool.swapABI, getProviderOrSigner(library, account))
      pool.contract = contract
    }
  }
}

export function* getMasterChefBalances() {
  const chainId = yield select(Web3Domains.selectChainIDDomain)
  const account = yield select(Web3Domains.selectAccountDomain)
  const library = yield select(Web3Domains.selectLibraryDomain)

  try {
    yield put(RewardsActions.setIsGettingMasterChefBalances(true))
    const tokensList = Object.values(tokens).filter(token => token.isLPToken)
    const masterchefBalancesCall: ContractCall[] = []
    const tokenAddressList: string[] = []
    tokensList.forEach((token) => {
      if (token.isLPToken && token.masterchefId !== undefined) {
        masterchefBalancesCall.push(
          getUserMasterchefInfo(account, token.masterchefId, chainId),
        )
        tokenAddressList.push(token.address)
      }
    })
    const balanceResponses = yield call(getMultiContractData, library,
      masterchefBalancesCall,
      tokenAddressList)


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
    }

    const balances = tokensList.reduce(
      (acc, t) => ({
        ...acc,
        [t.symbol]: {
          userInfo: {
            amount: balanceResponses[t.address]?.userInfo[0], // eslint-disable-line
            rewardDebt: balanceResponses[t.address]?.userInfo[1], // eslint-disable-line
          },
          pendingTokens: {
            pendingAxial: balanceResponses[t.address]?.pendingTokens[0], // eslint-disable-line
            bonusTokenAddress:
              balanceResponses[t.address]?.pendingTokens[1], // eslint-disable-line
            bonusTokenSymbol:
              balanceResponses[t.address]?.pendingTokens[2], // eslint-disable-line
            pendingBonusToken:
              balanceResponses[t.address]?.pendingTokens[3], // eslint-disable-line
          },
        },
      }),
      { _info: _info },
    )
    yield all([
      put(RewardsActions.setMasterChefBalances(balances)),
      put(RewardsActions.setIsGettingMasterChefBalances(false))
    ])

  } catch (e) {
    yield put(RewardsActions.setIsGettingMasterChefBalances(false))
    console.log(e)
  }
}


export function* getMasterchefAPR() {
  try {
    const aprData = yield call(getVaultRewardAprNow)
    yield put(RewardsActions.setMasterChefAPR(aprData))
  } catch (e) {
    console.log(e)
  }
}

export function* rewardsSaga() {
  yield takeLatest(RewardsActions.getRewardPoolsData.type, getRewardPoolsData);
  yield takeLatest(RewardsActions.getMasterChefBalances.type, getMasterChefBalances);
  yield takeLatest(RewardsActions.getMasterchefAPR.type, getMasterchefAPR);
}

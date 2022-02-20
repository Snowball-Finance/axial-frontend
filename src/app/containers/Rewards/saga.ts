// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { GlobalDomains } from "app/appSelectors";
import { tokens } from "app/tokens";
import { Console } from "console";
import { BigNumber, Contract } from "ethers";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { Web3Domains } from "../BlockChain/Web3/selectors";
import { getProviderOrSigner } from "../utils/contractUtils";
import {
  ContractCall,
  getMultiContractData,
  getUserMasterchefInfo,
} from "../utils/multicall";
import { fetchSwapStatsNow } from "./providers/getSwapStats";
import { getVaultRewardAprNow } from "./providers/getVaultRewardsAPR";
import { RewardsActions } from "./slice";
import { MasterchefResponse, Pool, RewardsState } from "./types";
import { calculatePoolData } from "./utils/calculatePoolData";

export function* getRewardPoolsData(action: {
  type: string;
  payload: RewardsState["pools"];
}) {
  const pools: any = { ...action.payload };
  const library = yield select(Web3Domains.selectLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const chainId = yield select(Web3Domains.selectChainIDDomain);
  const tokenPricesUSD = yield select(GlobalDomains.tokenPricesUSD);

  try {
    const arrayOfDataGetters = Object.values(pools).map((pool: any) => {
      const dataToPass = {
        pool,
        account,
        chainId,
        library,
        tokenPricesUSD,
      };
      return call(calculatePoolData, dataToPass);
    });
    const responses = yield all(arrayOfDataGetters);
    console.log(responses);
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
            amount: balanceResponses[t.address]?.userInfo[0], // eslint-disable-line
            rewardDebt: balanceResponses[t.address]?.userInfo[1], // eslint-disable-line
          },
          pendingTokens: {
            pendingAxial: balanceResponses[t.address]?.pendingTokens[0], // eslint-disable-line
            bonusTokenAddress: balanceResponses[t.address]?.pendingTokens[1], // eslint-disable-line
            bonusTokenSymbol: balanceResponses[t.address]?.pendingTokens[2], // eslint-disable-line
            pendingBonusToken: balanceResponses[t.address]?.pendingTokens[3], // eslint-disable-line
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

export function* rewardsSaga() {
  yield takeLatest(RewardsActions.getRewardPoolsData.type, getRewardPoolsData);
  yield takeLatest(
    RewardsActions.getMasterChefBalances.type,
    getMasterChefBalances
  );
  yield takeLatest(RewardsActions.getMasterchefAPR.type, getMasterchefAPR);
  yield takeLatest(RewardsActions.getSwapStats.type, getSwapStats);
}

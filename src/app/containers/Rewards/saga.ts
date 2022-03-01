// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { GlobalDomains } from "app/appSelectors";
import { tokens } from "app/tokens";
import { BigNumber } from "ethers";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { Web3Domains } from "../BlockChain/Web3/selectors";
import {
  ContractCall,
  getMultiContractData,
  getUserMasterchefInfo,
} from "../utils/multicall";
import { fetchSwapStatsNow } from "./providers/getSwapStats";
import { getVaultRewardAprNow } from "./providers/getVaultRewardsAPR";
import { RewardsDomains } from "./selectors";
import { RewardsActions } from "./slice";
import { MasterchefResponse, Pool, Pools, RewardsState } from "./types";
import { calculatePoolData } from "./utils/calculatePoolData";

export function* getRewardPoolsData(action: {
  type: string;
  payload: RewardsState["pools"];
}) {
  yield put(RewardsActions.setRewardPools(action.payload));
  const pools: RewardsState["pools"] = yield select(RewardsDomains.pools);
  const library = yield select(Web3Domains.selectLibraryDomain);
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
        library,
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

export function* rewardsSaga() {
  yield takeLatest(RewardsActions.getRewardPoolsData.type, getRewardPoolsData);
  yield takeLatest(
    RewardsActions.getMasterChefBalances.type,
    getMasterChefBalances
  );
  yield takeLatest(RewardsActions.getMasterchefAPR.type, getMasterchefAPR);
  yield takeLatest(RewardsActions.getSwapStats.type, getSwapStats);
}

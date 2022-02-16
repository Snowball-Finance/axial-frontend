// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';
import { IS_DEV } from "environment";
import { BigNumber } from "ethers";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { generatePoolInfo, getMultiContractData } from "services/multicall";
import { getGaugeCalls, getPoolCalls } from "services/multicall-queries";
import { EthersDomains } from "../BlockChain/Ethers/selectors";
import { BlockChainDomains } from "../BlockChain/selectors";
import { Web3Domains } from "../BlockChain/Web3/selectors";
import { getAllocations, httpQuery, retrieveGauge } from "./providers/gauge";
import { selectGaugeContractDomain, selectPoolsArrayDomain } from "./selectors";
import { PoolsAndGaugesActions } from "./slice";
import { LastInfo, PoolInfoItem, PoolProvider } from "./types";

export function* getLastInfo(action: {
  type: string;
  payload: { query: string };
}) {
  try {
    const { query } = action.payload;
    yield put(PoolsAndGaugesActions.setIsLoadingLastInfo(true));
    const lastInfoQuery = query;
    const { data } = yield call(httpQuery, lastInfoQuery || "");
    yield put(PoolsAndGaugesActions.setLastInfo(data.LastSnowballInfo));
    const lastSnowballInfo: LastInfo = data.LastSnowballInfo;
    const pools = lastSnowballInfo.poolsInfo.map((pool) => {
      return {
        ...pool,
        userLPBalance: BigNumber.from(0.0),
      };
    });
    const tmp = {};
    pools.forEach((item) => {
      tmp[item.address] = item;
    });
    yield put(PoolsAndGaugesActions.setPools(tmp));
  } catch (error) {
    if (IS_DEV) {
      console.error(error);
    }
    toast.error("failed to get latest pools Info");
  } finally {
    yield put(PoolsAndGaugesActions.setIsLoadingLastInfo(false));
  }
}
export function* getAndSetUserPools() {
  try {
    yield put(PoolsAndGaugesActions.setIsGettingPoolsAndGauges(true));
    const gaugeProxyContract = yield select(selectGaugeContractDomain);
    const account = yield select(Web3Domains.selectAccountDomain);
    const provider = yield select(EthersDomains.selectPrivateProviderDomain);
    const prices = yield select(BlockChainDomains.selectPricesDomain);
    const pools = yield select(selectPoolsArrayDomain);
    let poolsCalls = [];
    let contractCalls = [];
    const poolProviders: { [key: string]: PoolProvider } = {};

    pools.forEach((item) => {
      //@ts-ignore
      poolsCalls = poolsCalls.concat(getPoolCalls({ item, account }));
      if (!poolProviders[item.source]) {
        poolProviders[item.source] = {
          name: item.source,
          //FIXME: implement correct Icon
          icon: "",
        };
      }
    });
    yield put(PoolsAndGaugesActions.setPoolProviders(poolProviders));
    pools.forEach((item) => {
      //@ts-ignore
      contractCalls = contractCalls.concat(getGaugeCalls(item, account));
    });
    const [gaugesData, poolsData, totalWeight] = yield all([
      call(getMultiContractData, provider, contractCalls),
      call(getMultiContractData, provider, poolsCalls),
      call(gaugeProxyContract.totalWeight),
    ]);
    let gauges = pools.map((item) =>
      retrieveGauge({ pool: item, gaugesData, totalWeight })
    );
    const poolInfo = pools.map((item) =>
      generatePoolInfo({ item, gauges, contractData: poolsData, prices })
    );
    gauges = yield call(getAllocations, { gauges, gaugeProxyContract });
    yield put(PoolsAndGaugesActions.setGauges(gauges));
    const tmp = {};
    poolInfo.forEach((item: PoolInfoItem) => {
      tmp[item.address] = item;
    });
    yield all([put(PoolsAndGaugesActions.setPools(tmp))]);
  } catch (error) {
    console.log(error);

    toast.error("failed to get user pools");
  } finally {
    yield put(PoolsAndGaugesActions.setIsGettingPoolsAndGauges(false));
  }
}
export function* poolsAndGaugesSaga() {
  yield takeLatest(
    PoolsAndGaugesActions.getInitialData.type,
    getAndSetUserPools
  );
  yield takeLatest(PoolsAndGaugesActions.getLastInfo.type, getLastInfo);
}

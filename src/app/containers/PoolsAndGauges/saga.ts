// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';
import { env, IS_DEV } from "environment";
import { BigNumber, Contract } from "ethers";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { getMultiContractData } from "services/multicall";
import { EthersDomains } from "../BlockChain/Ethers/selectors";
import { Web3Domains } from "../BlockChain/Web3/selectors";
import { getAllocations } from "./providers/gauge";
import { selectPoolsArrayDomain } from "./selectors";
import { PoolsAndGaugesActions } from "./slice";
import { PoolInfo } from "./types";
import GAUGE_PROXY_ABI from "abi/gaugeProxy.json";
import GAUGE_ABI from "abi/gauge.json";
import LP_ABI from "abi/lp-token.json";
import { getProviderOrSigner } from "../utils/contractUtils";
import { Gauge, GaugeProxy, LpToken } from "abi/ethers-contracts";
import { getLastInfoAPI } from "./providers/lastInfo";
import { getPoolCalls } from "./providers/getPoolCalls";
import { getGaugeCalls } from "./providers/getGaugeCalls";
import { retrieveGauge } from "./providers/retrieveGauge";
import { RewardsActions } from "../Rewards/slice";
import { AprData } from "../Rewards/types";

export function* getLastInfo() {
  try {
    const library = yield select(Web3Domains.selectNetworkLibraryDomain);
    const account = yield select(Web3Domains.selectAccountDomain);
    yield put(PoolsAndGaugesActions.setIsLoadingLastInfo(true));
    const lastSnowballInfo: PoolInfo[] = yield call(getLastInfoAPI);
    yield put(PoolsAndGaugesActions.setLastInfo(lastSnowballInfo));
    const pools = lastSnowballInfo.map((pool) => {
      return {
        ...pool,
        userLPBalance: BigNumber.from(0.0),
      };
    });
    const tmp = {};
    const poolsAprData: AprData = {};
    pools.forEach((item) => {
      tmp[item.swapaddress || item.tokenaddress] = item;
      //CHECK_HERE, we want to replace masterchef apr data
      //swap address is used in liquidity and for rewards we will use lpTokenAddress as key
      poolsAprData[item.swapaddress || item.tokenaddress] = {
        apr: Number(item.last_apr), // apr for liquidity page should be last_swap_apr,
        lptvl: Number(item.last_tvl),
        tokenPoolPrice: Number(item.last_token_price),
        //TODO:this part should come through contract call,address:pool.gaugeAddress, abi:GaugeABI
        //for liquidity it's lpToken address total supply and for rewards data it's gauge address
        totalStaked: "0x00",
      };
    });
    const callStack: any[] = [];
    const providerOrSigner = getProviderOrSigner(library, account);
    for (const pool of pools) {
      const address = pool.tokenaddress || pool.gauge_address;
      let contract = new Contract(
        address,
        GAUGE_ABI,
        providerOrSigner
      ) as Gauge;
      callStack.push(call(contract.totalSupply));
    }
    const results: any[] = yield all(callStack);
    for (const pool of pools) {
      poolsAprData[pool.swapaddress || pool.tokenaddress].totalStaked =
        results.shift();
    }
    yield put(PoolsAndGaugesActions.setPools(tmp));
    yield put(RewardsActions.setAprData(poolsAprData));
  } catch (error) {
    if (IS_DEV) {
      console.error(error);
    }
    toast.error("failed to get latest pools Info");
  } finally {
    yield put(PoolsAndGaugesActions.setIsLoadingLastInfo(false));
  }
}

export function* getGaugeProxyContract() {
  const library = yield select(Web3Domains.selectNetworkLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const gaugeAddress = env.GAUGE_PROXY_ADDRESS || "";
  const gaugeProxyContract = new Contract(
    gaugeAddress,
    GAUGE_PROXY_ABI,
    getProviderOrSigner(library, account)
  );
  return gaugeProxyContract;
}

function* getAndMergeAdditionalPoolInfo({
  item,
  gauges,
  contractData,
}: {
  item: PoolInfo;
  gauges: any;
  contractData: any;
}) {
  const library = yield select(Web3Domains.selectNetworkLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  // const gaugeContract = new Contract(
  //   item.gauge_address,
  //   GAUGE_ABI,
  //   getProviderOrSigner(library, account)
  // ) as Gauge;

  const poolContract = new Contract(
    item.tokenaddress,
    LP_ABI,
    getProviderOrSigner(library, account)
  ) as LpToken;

  const lpData = contractData[item.tokenaddress];
  const gauge = gauges.find(
    (gauge) => gauge.address.toLowerCase() === item.gauge_address.toLowerCase()
  );

  let totalSupply = 0,
    userDepositedLP = 0,
    underlyingTokens = item.tokens,
    lpDecimals = 18;
  lpDecimals = lpData.decimals;

  [lpDecimals, userDepositedLP, totalSupply] = yield all([
    call(poolContract.decimals),
    call(poolContract.balanceOf, account),
    call(poolContract.totalSupply),
  ]);
  return {
    ...item,
    address: item.tokenaddress,
    lpDecimals, //from pool contract call
    userDepositedLP, //from pool contract call
    totalSupply, //from pool contract call
    gauge, // from gauges
    underlyingTokens, // from api
    userBalanceGauge: gauge ? gauge.staked : 0, //from the gauge
  };
}

export function* getAndSetUserPools() {
  try {
    yield put(PoolsAndGaugesActions.setIsGettingPoolsAndGauges(true));
    const gaugeProxyContract: GaugeProxy = yield call(getGaugeProxyContract);
    const account = yield select(Web3Domains.selectAccountDomain);
    const provider = yield select(EthersDomains.selectPrivateProviderDomain);
    const pools: PoolInfo[] = yield select(selectPoolsArrayDomain);
    let poolsCalls: any[] = [];
    let gaugesCalls: any[] = [];
    pools.forEach((item) => {
      poolsCalls = poolsCalls.concat(getPoolCalls({ item, account }));
      gaugesCalls = gaugesCalls.concat(getGaugeCalls({ item, account }));
    });
    const [gaugesData, poolsData, totalWeight] = yield all([
      call(getMultiContractData, provider, gaugesCalls, true),
      call(getMultiContractData, provider, poolsCalls),
      call(gaugeProxyContract.totalWeight),
    ]);
    let gauges: any = pools.map((item) =>
      retrieveGauge({ pool: item, gaugesData, totalWeight, poolsData })
    );
    let poolsInfoCallArray: any[] = [];
    pools.forEach((item) => {
      poolsInfoCallArray.push(
        call(getAndMergeAdditionalPoolInfo, {
          item,
          gauges,
          contractData: poolsData,
        })
      );
    });
    const poolInfo = yield all(poolsInfoCallArray);
    gauges = yield call(getAllocations, { gauges, gaugeProxyContract });
    yield put(PoolsAndGaugesActions.setGauges(gauges));
    const tmp = {};
    const userPoolsData = {};
    poolInfo.forEach((item: PoolInfo) => {
      tmp[item.tokenaddress] = item;
      userPoolsData[item.symbol] = item.gauge?.additionalData || {};
    });
    yield all([
      put(PoolsAndGaugesActions.setPools(tmp)),
      put(PoolsAndGaugesActions.setUserPoolsData(userPoolsData)),
      put(RewardsActions.setPoolsBalances(userPoolsData)),
    ]);
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

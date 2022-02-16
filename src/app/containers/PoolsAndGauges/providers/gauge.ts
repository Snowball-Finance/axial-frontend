import { env } from "environment";
import { IS_DEV } from "environment";
import { getMultiContractData } from "services/multicall";

export const httpQuery = async (query: string) => {
  const data = await fetch(
    (IS_DEV ? env.DEVAPIADDR : env.APIADDR) + "?query=" + query,
    {
      method: "GET",
    }
  );
  const res = await data.json();
  return res;
};

export const getAllocations = async ({ gauges, gaugeProxyContract }) => {
  const res = await Promise.all(
    gauges.map(async (gauge, index) => {
      const gaugeWeight = await gaugeProxyContract.weights(gauge.token);
      const allocPoint = gaugeWeight / gauge.totalWeight || 0;
      return { ...gauge, allocPoint };
    })
  );
  return res;
};

export const retrieveGauge = ({ pool, gaugesData, totalWeight }) => {
  const gaugeTokenData = gaugesData[pool.address];
  const gaugeData = gaugesData[pool.gaugeInfo.address];
  const address = pool.gaugeInfo.address;
  const balance = gaugeTokenData.balanceOf;
  const staked = gaugeData.balanceOf;
  const harvestable = gaugeData.earned;
  const totalSupply = gaugeData.totalSupply;
  const gauge = pool;
  const fullApy = 0;

  return {
    token: pool.address,
    address,
    source: pool.source,
    gaugeAddress: address,
    totalWeight: +totalWeight.toString(),
    totalSupply,
    balance,
    staked,
    harvestable,
    depositTokenName:
      `${gauge?.kind === "Snowglobe" ? gauge?.symbol + "-" : ""}` +
        `${gauge?.name}` || "No Name",
    poolName:
      `${gauge?.kind === "Snowglobe" ? gauge?.symbol + "-" : ""}` +
      `${gauge?.name || "No Name"} Pool`,
    fullApy,
  };
};
export const getGauges = async ({
  gaugeProxyContract,
  pools,
  provider,
  poolsCalls,
}) => {
  const totalWeight = await gaugeProxyContract.totalWeight();
  const gaugesData = await getMultiContractData(provider, poolsCalls);
  const gauges = await Promise.all(
    pools.map(async (pool) => {
      return await retrieveGauge({ pool, gaugesData, totalWeight });
    })
  );
  return gauges;
};

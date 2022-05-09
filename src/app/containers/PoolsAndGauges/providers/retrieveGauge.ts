import { PoolInfo } from "../types";

export const retrieveGauge = ({
  pool,
  gaugesData,
  totalWeight,
  poolsData,
}: {
  pool: PoolInfo;
  gaugesData: any;
  totalWeight: any;
  poolsData: any;
}) => {
  const harvestable: any = {};
  const poolTokens = [...pool.tokens];
  const lpTokenData = poolsData[pool.tokenaddress];
  const gaugeData = gaugesData[pool.gauge_address];
  const address = pool.gauge_address;
  for (let i = 0; i < 10; i++) {
    const key = `earned${i === 0 ? "" : i}`;
    if (!!gaugeData[key]) {
      const k = pool.last_rewards_apr[i][0];
      harvestable[k] = gaugeData[key];
    }
  }
  const lpTokenBalance = lpTokenData.balanceOf;
  const totalStaked = gaugeData.balanceOf;
  const totalSupply = gaugeData.totalSupply;

  return {
    ...gaugeData,
    token: pool.tokenaddress,
    address,
    gaugeAddress: address,
    totalWeight: +totalWeight.toString(),
    totalSupply,
    lpTokenBalance,
    totalStaked,
    harvestable,
    poolTokens,
    depositTokenName: pool.symbol,
    poolName: pool.symbol,
  };
};
// export const getGauges = async ({
//   gaugeProxyContract,
//   pools,
//   provider,
//   poolsCalls,
// }) => {
//   const contract: GaugeProxy = gaugeProxyContract;
//   const totalWeight = await contract.totalWeight();
//   const gaugesData = await getMultiContractData(provider, poolsCalls);
//   const gauges = await Promise.all(
//     pools.map(async (pool) => {
//       return await retrieveGauge({ pool, gaugesData, totalWeight });
//     })
//   );
//   return gauges;
// };

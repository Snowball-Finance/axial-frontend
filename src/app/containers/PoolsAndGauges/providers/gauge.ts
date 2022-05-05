import { GaugeProxy } from "abi/ethers-contracts";

export const getAllocations = async ({
  gauges,
  gaugeProxyContract,
}: {
  gauges: any;
  gaugeProxyContract: GaugeProxy;
}) => {
  const res = await Promise.all(
    gauges.map(async (gauge, index) => {
      const gaugeWeight = await gaugeProxyContract.weights(gauge.token);
      const allocPoint = Number(gaugeWeight) / gauge.totalWeight || 0;
      return { ...gauge, allocPoint };
    })
  );
  return res;
};

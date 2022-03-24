import { env, IS_DEV } from "environment";
import { POOLS_INFO_BY_ADDRESS } from "services/apollo/queries/poolInfo";

interface GaugeInfoQuery {
  snobYearlyAPR: number;
}

interface PoolsInfoByAddress {
  address: string;
  name: string;
  yearlyAPY: number;
  yearlySwapFees: number;
  gaugeInfo: GaugeInfoQuery;
}

export interface PoolsInfoByAddressQueryResponse {
  PoolsInfoByAddress: PoolsInfoByAddress;
}

export const getPoolInfoByAddressAPI = async (
  address: string
): Promise<PoolsInfoByAddressQueryResponse> => {
  const response = await fetch(
    IS_DEV ? env.DEVAPIADDR ?? "" : env.APIADDR ?? "",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: POOLS_INFO_BY_ADDRESS,
        variables: {
          address,
        },
      }),
    }
  );

  const res = await response.json();
  return res;
};

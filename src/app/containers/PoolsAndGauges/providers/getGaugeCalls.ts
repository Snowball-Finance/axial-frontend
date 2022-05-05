import { ContractCall } from "services/multicall";
import GAUGE_ABI from "abi/gauge.json";
import { PoolInfo } from "../types";

export const getGaugeCalls = ({
  item,
  account,
}: {
  item: PoolInfo;
  account: string;
}) => {
  const gaugeCalls = new ContractCall(item.gauge_address, GAUGE_ABI);
  gaugeCalls.setCall("balanceOf", [account]);
  item.last_rewards_apr.forEach((reward, index) => {
    gaugeCalls.setCall(
      "earned",
      [account, reward[0]],
      index !== 0 ? `earnedCall${index}` : undefined
    );
  });
  gaugeCalls.setCall("totalSupply", []);
  return [gaugeCalls];
};

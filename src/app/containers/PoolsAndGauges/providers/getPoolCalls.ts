import { ContractCall } from "services/multicall";
import LP_ABI from "abi/lp-token.json";
import { PoolInfo } from "../types";

export const getPoolCalls = ({
  item,
  account,
}: {
  item: PoolInfo;
  account: string;
}) => {
  const lpContractCalls = new ContractCall(item.tokenaddress, LP_ABI);
  lpContractCalls.setCall("balanceOf", [account]);
  lpContractCalls.setCall("decimals", []);
  lpContractCalls.setCall("totalSupply", []);
  return [lpContractCalls];
};

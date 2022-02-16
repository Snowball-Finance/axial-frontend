import { Contract } from "app/types";

export const balanceProvider = async ({
  contract,
  account,
}: {
  contract: Contract;
  account: string;
}) => {
  return contract["balanceOf(address)"](account);
};
export const totalSupplyProvider = async ({
  contract,
}: {
  contract: Contract;
}) => {
  return contract["totalSupply()"]();
};

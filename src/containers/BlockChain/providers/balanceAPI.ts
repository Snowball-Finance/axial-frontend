import { Contract } from "ethers";

export const balanceProvider = async ({
  contract,
  account,
}: {
  contract: Contract;
  account: string;
// eslint-disable-next-line @typescript-eslint/require-await
}) => {
  return contract["balanceOf(address)"](account);
};
export const totalSupplyProvider = async ({
  contract,
}: {
  contract: Contract;
// eslint-disable-next-line @typescript-eslint/require-await
}) => {
  return contract["totalSupply()"]();
};

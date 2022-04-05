import { BigNumber } from "@ethersproject/bignumber";
import { Erc20 } from "abi/ethers-contracts/Erc20";
import { LpTokenGuarded } from "abi/ethers-contracts/LpTokenGuarded";
import { LpTokenUnguarded } from "abi/ethers-contracts/LpTokenUnguarded";

export default async function checkTokenApprovalStatus(
  srcTokenContract: Erc20 | LpTokenGuarded | LpTokenUnguarded,
  swapAddress: string,
  spenderAddress: string,
  spendingValue: BigNumber
) {
  if (srcTokenContract == null) return false;
  if (spendingValue.eq(0)) return false;
  const tokenName = await srcTokenContract.name();
  const existingAllowance = await srcTokenContract.allowance(
    spenderAddress,
    swapAddress
  );

  console.debug(
    `Existing ${tokenName} Allowance: ${existingAllowance.toString()}`
  );
  if (existingAllowance.gte(spendingValue)) return true;

  return false;
}

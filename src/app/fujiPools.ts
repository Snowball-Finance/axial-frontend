import { Pools, PoolTypes, RewardsState } from "./containers/Rewards/types";
import { tokens } from "./tokens";
import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";

export const fujiPools = {
  [Pools.P3T]: {
    key: Pools.P3T,
    name: "Pool 3 Tokens",
    address: tokens.P3T?.address,
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    poolTokens: [tokens.STABLE1, tokens.STABLE2, tokens.STABLE3],
    lpToken: tokens.P3T,
    gauge_address: "0x81195A398ea621991175967AED395e0B82605D1c",
    swapAddress: "0x25949663b5C22e49e541eDEA98F70edB865f1Ec4",
  },
  [Pools.PGL]: {
    key: Pools.PGL,
    name: "PGL AVAX-EXTRAT",
    address: tokens.PGL?.address,
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.LP,
    poolTokens: [],
    lpToken: tokens.PGL,
    gauge_address: "0x92ffd3c24F1660186d5F51c52bd54C31A578c81d",
  },
  [Pools.S3T]: {
    key: Pools.S3T,
    name: "Secondary 3 Tokens",
    address: tokens.S3T?.address,
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    poolTokens: [tokens.STABLE3, tokens.STABLE4, tokens.STABLE5],
    lpToken: tokens.S3T,
    gauge_address: "0x0797a8F7636DEE441b70B3f91D7D3217301401F3",
    swapAddress: "0x80e20538A5f8347b94a9f617Fc568174C88821c2",
  },
} as RewardsState["pools"];

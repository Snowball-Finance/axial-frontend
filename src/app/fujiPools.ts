import {
  gaugeAddress,
  poolSwapAddress,
} from "utils/poolAddresses";
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
    gauge_address: gaugeAddress(Pools.P3T),
    swapAddress: poolSwapAddress(Pools.P3T),
  },
  [Pools.PGL]: {
    key: Pools.PGL,
    name: "PGL AVAX-EXTRAT",
    address: tokens.PGL?.address,
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.LP,
    poolTokens: [],
    lpToken: tokens.PGL,
    gauge_address: gaugeAddress(Pools.PGL),
  },
  [Pools.S3T]: {
    key: Pools.S3T,
    name: "Secondary 3 Tokens",
    address: tokens.S3T?.address,
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    poolTokens: [tokens.STABLE3, tokens.STABLE4, tokens.STABLE5],
    lpToken: tokens.S3T,
    gauge_address: gaugeAddress(Pools.S3T),
    swapAddress: poolSwapAddress(Pools.S3T),
  },
} as RewardsState["pools"];

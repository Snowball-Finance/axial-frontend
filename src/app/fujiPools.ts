import {
  gaugeAddress,
  poolAddress,
  poolSwapAddress,
} from "utils/poolAddresses";
import { Pools, PoolTypes, RewardsState } from "./containers/Rewards/types";
import { tokens } from "./tokens";
import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";

export const fujiPools = {
  [Pools.P3T]: {
    key: Pools.P3T,
    name: "Pool 3 Tokens",
    address: poolAddress(Pools.P3T),
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
    address: poolAddress(Pools.PGL),
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.LP,
    poolTokens: [],
    lpToken: tokens.PGL,
    gauge_address: gaugeAddress(Pools.PGL),
  },
} as RewardsState["pools"];

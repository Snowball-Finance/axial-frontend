import {
  gaugeAddress,
  poolAddress,
  poolSwapAddress,
} from "utils/poolAddresses";
import { Pools, PoolTypes, RewardsState } from "./containers/Rewards/types";
import { tokens } from "./tokens";
import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";

export const fujiPools = {
  [Pools.T3P]: {
    key: Pools.T3P,
    name: "Tundra 3Pool",
    address: poolAddress(Pools.T3P),
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    poolTokens: [tokens.SC1, tokens.SC2, tokens.SC3],
    lpToken: tokens.T3P,
    gauge_address: gaugeAddress(Pools.T3P),
    swapAddress: poolSwapAddress(Pools.T3P),
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
  [Pools.TEST]: {
    key: Pools.TEST,
    name: "Singlesided TEST",
    address: poolAddress(Pools.TEST),
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.LP,
    poolTokens: [],
    lpToken: tokens.PGL,
    gauge_address: gaugeAddress(Pools.TEST),
  },
} as RewardsState["pools"];

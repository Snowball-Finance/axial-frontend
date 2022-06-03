import { Pools, PoolTypes, RewardsState } from "./containers/Rewards/types";

import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";
import { tokens } from "./tokens";
import { networkName } from "utils/tokenAddresses";
import { fujiPools } from "./fujiPools";
import { poolSwapAddress } from "utils/poolAddresses";

export const pools =
  networkName === "Fuji"
    ? fujiPools
    : ({
        SCALES: {
          key: Pools.SCALES,
          name: "Scales Stablecoins",
          address: tokens.SCALES?.address || "",
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [
            tokens["DAI.e"],
            tokens["USDT.e"],
            tokens["USDC.e"],
            tokens.USDC,
          ],
          lpToken: tokens.SCALES,
          swapAddress: poolSwapAddress(Pools.SCALES),
          gauge_address: "0x63eD1dD9827a08CE2168139f8069edE751649D6c",
        },
        HERO: {
          key: Pools.HERO,
          name: "Hero Stablecoins",
          address: tokens.HERO?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [tokens.USDC, tokens.USDt, tokens.MIM, tokens.YUSD],
          lpToken: tokens.HERO,
          swapAddress: poolSwapAddress(Pools.HERO),
          gauge_address: "0x363A6fc27eD7a3dFDF94d33c37A6E8527c2014ea",
        },
        AS4D: {
          key: Pools.AS4D,
          name: "AS4D Stablecoins",
          address: tokens.AS4D?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [
            tokens.TUSD,
            tokens["USDC.e"],
            tokens["DAI.e"],
            tokens["USDT.e"],
          ],
          lpToken: tokens.AS4D,
          swapAddress: poolSwapAddress(Pools.AS4D),
          gauge_address: "0xEE0a5Ce8C431B1253CA5545D7EfCA21fe63AD74F",
        },
        AC4D: {
          key: Pools.AC4D,
          name: "AC4D Stablecoins",
          address: tokens.AC4D?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [tokens.TSD, tokens.MIM, tokens.FRAX, tokens["DAI.e"]],
          lpToken: tokens.AC4D,
          swapAddress: poolSwapAddress(Pools.AC4D),
          gauge_address: "0xB81382a23ef5E5394cf993a5B16e0Dd7cf344D60",
        },
        AM3D: {
          key: Pools.AM3D,
          name: "AM3D Stablecoins",
          address: tokens.AM3D?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [tokens.MIM, tokens["USDC.e"], tokens["DAI.e"]],
          lpToken: tokens.AM3D,
          swapAddress: poolSwapAddress(Pools.AM3D),
          gauge_address: "0x321F5449bCf840297A027D92EA8723bc0a0388B5",
        },
      } as RewardsState["pools"]);

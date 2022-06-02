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
          gauge_address: "",
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
          gauge_address: "",
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
          gauge_address: "",
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
          gauge_address: "",
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
          gauge_address: "",
        },
      } as RewardsState["pools"]);

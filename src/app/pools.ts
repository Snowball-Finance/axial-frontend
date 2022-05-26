import { Pools, PoolTypes, RewardsState } from "./containers/Rewards/types";
import META_SWAP_ABI from "abi/metaSwap.json";

import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";
import { tokens } from "./tokens";
import { networkName } from "utils/tokenAddresses";
import { fujiPools } from "./fujiPools";

export const pools =
  networkName === "Fuji"
    ? fujiPools
    : ({
        SCALES: {
          key: Pools.SCALES,
          name: "Scales Stablecoins",
          address: tokens.SCALES?.address||'',
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [
            tokens["DAI.e"],
            tokens["USDT.e"],
            tokens["USDC.e"],
            tokens.USDC,
          ],
          lpToken: tokens.SCALES,
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
          gauge_address: "",
        },
        AS4D: {
          key: Pools.AS4D,
          name: "AS4D Stablecoins",
          address: tokens.AS4D?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [
            tokens["DAI.e"],
            tokens["USDT.e"],
            tokens["USDC.e"],
            tokens.TUSD,
          ],
          lpToken: tokens.AS4D,
          gauge_address: "",
        },
        AC4D: {
          key: Pools.AC4D,
          name: "AC4D Stablecoins",
          address: tokens.AC4D?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [tokens["DAI.e"], tokens.MIM, tokens.TSD, tokens.FRAX],
          lpToken: tokens.AC4D,
          gauge_address: "",
        },
        AM3D: {
          key: Pools.AM3D,
          name: "AM3D Stablecoins",
          address: tokens.AM3D?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [tokens["DAI.e"], tokens["USDC.e"], tokens.MIM],
          lpToken: tokens.AM3D,
          gauge_address: "",
        },
      } as RewardsState["pools"]);

import { Pools, PoolTypes, RewardsState } from "./containers/Rewards/types";

import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";
import { tokens } from "./tokens";
import { networkName } from "utils/network";
import { fujiPools } from "./fujiPools";

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
          swapAddress: "0xfD24d41B7C4C7C8Cd363Dd3FF6f49C99c8280430",
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
          swapAddress: "0xa0f6397FEBB03021F9BeF25134DE79835a24D76e",
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
          swapAddress: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
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
          swapAddress: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
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
          swapAddress: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
          gauge_address: "0x321F5449bCf840297A027D92EA8723bc0a0388B5",
        },
        PERSEUS: {
          key: Pools.PERSEUS,
          name: "PERSEUS",
          address: tokens.PERSEUS?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.BTC,
          poolTokens: [tokens["WBTC.e"], tokens["BTC.b"]],
          lpToken: tokens.PERSEUS,
          swapAddress: "0x001a7904FEc3eed1184FEf5cBE232CfC06fa14dE",
          gauge_address: "0x59142fEf1ce9fC3B6218A1da182401a0bFda53C7",
        },
        HERCULES: {
          key: Pools.HERCULES,
          name: "HERCULES",
          address: tokens.HERCULES?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.BTC,
          poolTokens: [tokens.renBTC, tokens["WBTC.e"]],
          lpToken: tokens.HERCULES,
          swapAddress: "0x21645EddC5EcB865b3909c989B8d208978CF7E16",
          gauge_address: "0x01c0cc7AcBEc933C547de8688cD006Aed5E5abA5",
        },
        PGL: {
          key: Pools.PGL,
          name: "PGL",
          address: tokens.PGL?.address,
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.LP,
          poolTokens: [tokens.WAVAX, tokens.AXIAL],
          lpToken: tokens.PGL,
          gauge_address: "0xe2e9DA3C2CB2252a833647b6d2d58b0617908934",
        },
      } as RewardsState["pools"]);

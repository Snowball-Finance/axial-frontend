import { Pools, PoolTypes, RewardsState } from "./containers/Rewards/types";
import META_SWAP_ABI from "abi/metaSwap.json";

import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";
import { tokens } from "./tokens";
import { poolAddress, poolSwapAddress } from "utils/poolAddresses";
import { networkName } from "utils/tokenAddresses";
import { fujiPools } from "./fujiPools";

export const pools =
  networkName === "Fuji"
    ? fujiPools
    : ({
        AXIAL_AS4D: {
          key: Pools.AXIAL_AS4D,
          name: "AS4D Stablecoins",
          address: poolAddress(Pools.AXIAL_AS4D),
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [
            tokens.TUSD,
            tokens.USDC,
            tokens["DAI.e"],
            tokens["USDT.e"],
          ],
          lpToken: tokens.as4dUSD,
          gauge_address: "",
        },
        AXIAL_AC4D: {
          key: Pools.AXIAL_AC4D,
          name: "AC4D Stablecoins",
          address: poolAddress(Pools.AXIAL_AC4D),
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [tokens.TSD, tokens.MIM, tokens.FRAX, tokens["DAI.e"]],
          lpToken: tokens.ac4dUSD,
          gauge_address: "",
        },
        AXIAL_JLP: {
          key: Pools.AXIAL_JLP,
          name: "JLP AVAX-AXIAL",
          address: poolAddress(Pools.AXIAL_JLP),
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.LP,
          poolTokens: [],
          lpToken: tokens.JLP,
          gauge_address: "",
        },
        AXIAL_AM3D: {
          key: Pools.AXIAL_AM3D,
          name: "AM3D Stablecoins",
          address: poolAddress(Pools.AXIAL_AM3D),
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [tokens.MIM, tokens["USDC.e"], tokens["DAI.e"]],
          lpToken: tokens.am3dUSD,
          gauge_address: "",
        },
        AXIAL_AA3D: {
          key: Pools.AXIAL_AA3D,
          name: "AA3D Stablecoins",
          address: poolAddress(Pools.AXIAL_AA3D),
          swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          poolType: PoolTypes.USD,
          poolTokens: [tokens.AVAI, tokens.MIM, tokens["USDC.e"]],
          lpToken: tokens.aa3dUSD,
          gauge_address: "",
        },
        USDC_AM3D: {
          key: Pools.USDC_AM3D,
          name: "USDC-AM3D Metapool",
          address: poolAddress(Pools.USDC_AM3D),
          swapABI: META_SWAP_ABI,
          swapAddress: poolSwapAddress(Pools.USDC_AM3D),
          poolType: PoolTypes.USD,
          poolTokens: [
            tokens.USDC,
            tokens["USDC.e"],
            tokens["DAI.e"],
            tokens.MIM,
          ],
          underlyingPoolTokens: [tokens.USDC, tokens.am3dUSD],
          lpToken: tokens.usdcAM3DUSD,
          gauge_address: "",
        },
      } as RewardsState["pools"]);

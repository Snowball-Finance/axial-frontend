import { Pools, PoolTypes, RewardsState } from "./containers/Rewards/types";
import METASWAP_DEPOSIT_ABI from "abi/metaSwapDeposit.json";
import META_SWAP_ABI from "abi/metaSwap.json";

import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";
import { tokens } from "./tokens";

export const pools: RewardsState["pools"] = {
  AXIAL_AS4D: {
    key: Pools.AXIAL_AS4D,
    name: "AS4D Stablecoins",
    address: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    poolTokens: [tokens.TUSD, tokens.USDC, tokens["DAI.e"], tokens["USDT.e"]],
    lpToken: tokens.as4dUSD,
  },
  AXIAL_AC4D: {
    key: Pools.AXIAL_AC4D,
    name: "AC4D Stablecoins",
    address: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    poolTokens: [tokens.TSD, tokens.MIM, tokens.FRAX, tokens["DAI.e"]],
    lpToken: tokens.ac4dUSD,
  },
  AXIAL_JLP: {
    key: Pools.AXIAL_JLP,
    name: "JLP AVAX-AXIAL",
    address: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.LP,
    poolTokens: [],
    lpToken: tokens.JLP,
  },
  AXIAL_AM3D: {
    key: Pools.AXIAL_AM3D,
    name: "AM3D Stablecoins",
    address: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    poolTokens: [tokens.MIM, tokens["USDC.e"], tokens["DAI.e"]],
    lpToken: tokens.am3dUSD,
  },
  AXIAL_AA3D: {
    key: Pools.AXIAL_AA3D,
    name: "AA3D Stablecoins",
    address: "0x6EfbC734D91b229BE29137cf9fE531C1D3bf4Da6",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    poolTokens: [tokens.AVAI, tokens.MIM, tokens["USDC.e"]],
    lpToken: tokens.aa3dUSD,
  },
  USDC_AM3D: {
    key: Pools.USDC_AM3D,
    name: "USDC-AM3D Metapool",
    address: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
    swapABI: META_SWAP_ABI,
    swapAddress: "0x26694e4047eA77cC96341f0aC491773aC5469d72",
    poolType: PoolTypes.USD,
    poolTokens: [tokens.USDC, tokens["USDC.e"], tokens["DAI.e"], tokens.MIM],
    underlyingPoolTokens: [tokens.USDC, tokens.am3dUSD],
    lpToken: tokens.usdcAM3DUSD,
  },
};

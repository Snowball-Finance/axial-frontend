import { PoolTypes, RewardsState } from "./containers/Rewards/types";
import METASWAP_DEPOSIT_ABI from "abi/metaSwapDeposit.json";
import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";
import axialLogo from "assets/icons/logo_icon.svg"; // this needs a smaller icon logo(24)

export const rewardPools: RewardsState["pools"] = {
  AXIAL_AS4D: {
    name: "AS4D Stablecoins",
    address: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    lpToken: {
      address: "0x3A7387f8BA3ebFFa4A0ECcB1733e940CE2275D3f",
      symbol: "as4dUSD",
      logo: axialLogo,
      masterChefId: 0,
      decimal: 18,
    },
  },
  AXIAL_AC4D: {
    name: "AC4D Stablecoins",
    address: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    lpToken: {
      address: "0x4da067E13974A4d32D342d86fBBbE4fb0f95f382",
      symbol: "ac4dUSD",
      logo: axialLogo,
      masterChefId: 1,
      decimal: 18,
    },
  },
  AXIAL_JLP: {
    name: "JLP AVAX-AXIAL",
    address: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.LP,
    lpToken: {
      address: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
      symbol: "JLP",
      logo: axialLogo,
      masterChefId: 2,
      decimal: 18,
    },
  },
  AXIAL_AM3D: {
    name: "AM3D Stablecoins",
    address: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    lpToken: {
      address: "0xc161E4B11FaF62584EFCD2100cCB461A2DdE64D1",
      symbol: "am3dUSD",
      logo: axialLogo,
      masterChefId: 3,
      decimal: 18,
    },
  },
  AXIAL_AA3D: {
    name: "AA3D Stablecoins",
    address: "0x6EfbC734D91b229BE29137cf9fE531C1D3bf4Da6",
    swapABI: SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
    poolType: PoolTypes.USD,
    lpToken: {
      address: "0xaD556e7dc377d9089C6564f9E8d275f5EE4da22d",
      symbol: "aa3dUSD",
      logo: axialLogo,
      masterChefId: 4,
      decimal: 18,
    },
  },

  USDC_AM3D: {
    name: "USDC-AM3D Metapool",
    address: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
    swapABI: METASWAP_DEPOSIT_ABI,
    swapAddress: "0x26694e4047eA77cC96341f0aC491773aC5469d72",
    poolType: PoolTypes.USD,
    lpToken: {
      address: "0xA57E0D32Aa27D3b1D5AFf6a8A786C6A4DADb818F",
      symbol: "am3dUSD",
      logo: axialLogo,
      masterChefId: 3,
      decimal: 18,
    },
  },
};

import ERC20_ABI from "abi/erc20.json";
import { SwapState } from "./containers/Swap/types";
import axialLogo from "assets/icons/logo_icon.svg" // this needs a smaller icon logo(24)
import daiLogo from "assets/icons/dai.svg"
import fraxLogo from "assets/icons/frax.svg"
import tsdLogo from "assets/icons/tsd.svg"
import mimLogo from "assets/icons/mim.svg"
import tusdLogo from "assets/icons/tusd.svg"
import usdcLogo from "assets/icons/usdc.svg"
import usdtLogo from "assets/icons/usdt.svg"
import avaiLogo from "assets/icons/avai.svg"


export const swapTokens:SwapState['tokens']={
  "USDT.e": {
    ABI: ERC20_ABI,
    address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    decimals: 18,
    symbol: "USDT.e",
    name: "Tether",
    logo: usdtLogo
  },
  FRAX: {
    ABI: ERC20_ABI,
    address: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
    decimals: 18,
    symbol: "FRAX",
    name: "Frax",
    logo: fraxLogo
  },
  'FXS':{
    ABI: ERC20_ABI,
    address: "0x214DB107654fF987AD859F34125307783fC8e387",
    decimals: 18,
    symbol: "FXS",
    name: "Frax Share",
    logo: axialLogo
  },
  "DAI.e":{
    ABI: ERC20_ABI,
    address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    decimals: 18,
    symbol: "DAI.e",
    name: "DAI.e",
    logo: daiLogo
  },
  'AVAI':{
    ABI: ERC20_ABI,
    address: "0x346A59146b9b4a77100D369a3d18E8007A9F46a6",
    decimals: 18,
    symbol: "AVAI",
    name: "AVAI",
    logo: avaiLogo
  },
  'TSD':{
    ABI: ERC20_ABI,
    address: "0x4fbf0429599460D327BD5F55625E30E4fC066095",
    decimals: 18,
    symbol: "TSD",
    name: "Teddy Dollar",
    logo: tsdLogo
  },
  'USDC':{
    ABI: ERC20_ABI,
    address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    decimals: 6,
    symbol: "USDC",
    name: "Native USDC",
    logo: usdcLogo
  },
  'MIM':{
    ABI: ERC20_ABI,
    address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
    decimals: 18,
    symbol: "MIM",
    name: "Magic Internet Money",
    logo: mimLogo
  },
  'TEDDY':{
    ABI: ERC20_ABI,
    address: "0x094bd7B2D99711A1486FB94d4395801C6d0fdDcC",
    decimals: 18,
    symbol: "TEDDY",
    name: "Teddy",
    logo: axialLogo
  },
  'WAVAX':{
    ABI: ERC20_ABI,
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    decimals: 18,
    symbol: "WAVAX",
    name: "Wrapped AVAX",
    logo: axialLogo
  },
  'TUSD':{
    ABI: ERC20_ABI,
    address: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
    decimals: 18,
    symbol: "TUSD",
    name: "TUSD",
    logo: tusdLogo
  },
  'USDC.e':{
    ABI: ERC20_ABI,
    address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    decimals: 6,
    symbol: "USDC.e",
    name: "USDC.e",
    logo: usdcLogo
  }
}
import { tokenAddress } from "utils/tokenAddresses";
import { Token, TokenSymbols } from "./containers/Swap/types";
import ERC20_ABI from "abi/erc20.json";
import axialLogo from "assets/icons/logo_icon.svg";

export const fujiTokens: { [K in TokenSymbols]?: Token } = {
  [TokenSymbols.STABLE1]: {
    address: tokenAddress(TokenSymbols.STABLE1),
    name: "Stable1",
    ABI: ERC20_ABI,
    symbol: TokenSymbols.STABLE1,
    logo: axialLogo,
    geckoId: "usd-coin",
    decimals: 18,
    masterchefId: -1,
    isSynthetic: false,
    isLPToken: false,
  },
  [TokenSymbols.STABLE2]: {
    address: tokenAddress(TokenSymbols.STABLE2),
    ABI: ERC20_ABI,
    symbol: TokenSymbols.STABLE2,
    name: "Stable2",
    geckoId: "usd-coin",
    decimals: 18,
    logo: axialLogo,
    masterchefId: -1,
    isSynthetic: false,
    isLPToken: false,
  },
  [TokenSymbols.STABLE3]: {
    address: tokenAddress(TokenSymbols.STABLE3),
    ABI: ERC20_ABI,
    symbol: TokenSymbols.STABLE3,
    name: "Stable3",
    geckoId: "usd-coin",
    decimals: 18,
    masterchefId: -1,
    logo: axialLogo,
    isSynthetic: false,
    isLPToken: false,
  },
  [TokenSymbols.STABLE4]: {
    name: "Stable4",
    geckoId: "usd-coin",
    decimals: 18,
    masterchefId: -1,
    isSynthetic: false,
    isLPToken: false,
    ABI: ERC20_ABI,
    address: tokenAddress(TokenSymbols.STABLE4),
    symbol: "STABLE4",
    logo: axialLogo,
  },
  [TokenSymbols.STABLE5]: {
    name: "Stable5",
    geckoId: "usd-coin",
    decimals: 18,
    masterchefId: -1,
    isSynthetic: false,
    isLPToken: false,
    ABI: ERC20_ABI,
    address: tokenAddress(TokenSymbols.STABLE5),
    symbol: "STABLE5",
    logo: axialLogo,
  },
  [TokenSymbols.S3T]: {
    symbol: "S3T",
    name: "Secondary 3 Tokens",
    geckoId: "secondary3tokens",
    decimals: 18,
    masterchefId: -1,
    isSynthetic: false,
    isLPToken: true,
    ABI: ERC20_ABI,
    address: tokenAddress(TokenSymbols.S3T),
    logo: axialLogo,
  },
  [TokenSymbols.P3T]: {
    address: tokenAddress(TokenSymbols.P3T),
    ABI: ERC20_ABI,
    symbol: TokenSymbols.P3T,
    name: "Pool 3 Tokens",
    geckoId: "pool3tokens",
    decimals: 18,
    masterchefId: -1,
    isSynthetic: false,
    isLPToken: true,
    logo: axialLogo,
  },
  [TokenSymbols.PGL]: {
    address: tokenAddress(TokenSymbols.PGL),
    ABI: ERC20_ABI,
    symbol: TokenSymbols.PGL,
    name: "PGL AVAX-EXTRAT",
    geckoId: "pglavaxextrat",
    decimals: 18,
    masterchefId: -1,
    isSynthetic: false,
    isLPToken: true,
    logo: axialLogo,
  },
  [TokenSymbols.AXIAL]: {
    symbol: "AXIAL",
    name: "Axial Token",
    geckoId: "axial-token",
    ABI: ERC20_ABI,
    decimals: 18,
    masterchefId: -1,
    isSynthetic: false,
    isLPToken: false,
    logo: axialLogo,
    blockSwap: true,
    address: tokenAddress(TokenSymbols.AXIAL),
  },
};

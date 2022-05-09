import { TokenSymbols } from "app/containers/Swap/types";

export type NetworkName = "Fuji" | "Avalanche";
const networkName =
  process.env.REACT_APP_NETWORK_NAME || ("Avalanche" as NetworkName);

const tokenAddresses: {
  [K in TokenSymbols]: {
    Avalanche: string;
    Fuji: string;
  };
} = {
  "USDT.e": {
    Avalanche: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    Fuji: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
  },
  usdcAM3DUSD: {
    Avalanche: "0xA57E0D32Aa27D3b1D5AFf6a8A786C6A4DADb818F",
    Fuji: "0xA57E0D32Aa27D3b1D5AFf6a8A786C6A4DADb818F",
  },
  ac4dUSD: {
    Avalanche: "0x4da067E13974A4d32D342d86fBBbE4fb0f95f382",
    Fuji: "0x4da067E13974A4d32D342d86fBBbE4fb0f95f382",
  },
  aa3dUSD: {
    Avalanche: "0xaD556e7dc377d9089C6564f9E8d275f5EE4da22d",
    Fuji: "0xaD556e7dc377d9089C6564f9E8d275f5EE4da22d",
  },

  am3dUSD: {
    Avalanche: "0xc161E4B11FaF62584EFCD2100cCB461A2DdE64D1",
    Fuji: "0xc161E4B11FaF62584EFCD2100cCB461A2DdE64D1",
  },
  as4dUSD: {
    Avalanche: "0x3A7387f8BA3ebFFa4A0ECcB1733e940CE2275D3f",
    Fuji: "0x3A7387f8BA3ebFFa4A0ECcB1733e940CE2275D3f",
  },
  JLP: {
    Avalanche: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
    Fuji: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
  },
  FRAX: {
    Avalanche: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
    Fuji: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
  },
  FXS: {
    Avalanche: "0x214DB107654fF987AD859F34125307783fC8e387",
    Fuji: "0x214DB107654fF987AD859F34125307783fC8e387",
  },
  "DAI.e": {
    Avalanche: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    Fuji: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
  },
  AVAI: {
    Avalanche: "0x346A59146b9b4a77100D369a3d18E8007A9F46a6",
    Fuji: "0x346A59146b9b4a77100D369a3d18E8007A9F46a6",
  },
  TSD: {
    Avalanche: "0x4fbf0429599460D327BD5F55625E30E4fC066095",
    Fuji: "0x4fbf0429599460D327BD5F55625E30E4fC066095",
  },
  USDC: {
    Avalanche: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    Fuji: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  },
  MIM: {
    Avalanche: "0x130966628846BFd36ff31a822705796e8cb8C18D",
    Fuji: "0x130966628846BFd36ff31a822705796e8cb8C18D",
  },
  TEDDY: {
    Avalanche: "0x094bd7B2D99711A1486FB94d4395801C6d0fdDcC",
    Fuji: "0x094bd7B2D99711A1486FB94d4395801C6d0fdDcC",
  },
  WAVAX: {
    Avalanche: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    Fuji: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  },
  TUSD: {
    Avalanche: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
    Fuji: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
  },
  "USDC.e": {
    Avalanche: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    Fuji: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
  },
  ORCA: {
    Avalanche: "0x8B1d98A91F853218ddbb066F20b8c63E782e2430",
    Fuji: "0x8B1d98A91F853218ddbb066F20b8c63E782e2430",
  },
};

export const tokenAddress = (key: TokenSymbols): string => {
  const address = tokenAddresses[key][networkName];
  if (!address)
    throw new Error(`Token ${key} not found for ${networkName} network`);
  return address;
};

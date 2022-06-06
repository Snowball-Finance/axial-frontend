import { TokenSymbols } from "app/containers/Swap/types";

export type NetworkName = "Fuji" | "Avalanche";
export const networkName = (process.env.REACT_APP_NETWORK_NAME ||
  "Avalanche") as NetworkName;

const tokenAddresses: {
  [K in TokenSymbols]: {
    Avalanche: string;
    Fuji: string;
  };
} = {
  [TokenSymbols.AM3D]: {
    Avalanche: "0xc161E4B11FaF62584EFCD2100cCB461A2DdE64D1",
    Fuji: "0xc161E4B11FaF62584EFCD2100cCB461A2DdE64D1",
  },
  [TokenSymbols.AC4D]: {
    Avalanche: "0x4da067E13974A4d32D342d86fBBbE4fb0f95f382",
    Fuji: "0x4da067E13974A4d32D342d86fBBbE4fb0f95f382",
  },
  [TokenSymbols.AS4D]: {
    Avalanche: "0x3A7387f8BA3ebFFa4A0ECcB1733e940CE2275D3f",
    Fuji: "0x3A7387f8BA3ebFFa4A0ECcB1733e940CE2275D3f",
  },
  [TokenSymbols.HERO]: {
    Avalanche: "0x73fA690aE97CdE1426d144E5f7406895fEa715E4",
    Fuji: "0x73fA690aE97CdE1426d144E5f7406895fEa715E4",
  },
  [TokenSymbols.SCALES]: {
    Avalanche: "0x556FB44205549c115e83A58d91522B14340Fb8d3",
    Fuji: "0x556FB44205549c115e83A58d91522B14340Fb8d3",
  },
  [TokenSymbols.YUSD]: {
    Avalanche: "0x111111111111ed1D73f860F57b2798b683f2d325",
    Fuji: "0x111111111111ed1D73f860F57b2798b683f2d325",
  },
  "USDT.e": {
    Avalanche: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    Fuji: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
  },
  [TokenSymbols.USDt]: {
    Avalanche: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    Fuji: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
  },
  [TokenSymbols.FRAX]: {
    Avalanche: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
    Fuji: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
  },

  "DAI.e": {
    Avalanche: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    Fuji: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
  },

  [TokenSymbols.TSD]: {
    Avalanche: "0x4fbf0429599460D327BD5F55625E30E4fC066095",
    Fuji: "0x4fbf0429599460D327BD5F55625E30E4fC066095",
  },
  [TokenSymbols.USDC]: {
    Avalanche: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    Fuji: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  },
  [TokenSymbols.MIM]: {
    Avalanche: "0x130966628846BFd36ff31a822705796e8cb8C18D",
    Fuji: "0x130966628846BFd36ff31a822705796e8cb8C18D",
  },

  [TokenSymbols.TUSD]: {
    Avalanche: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
    Fuji: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
  },
  "USDC.e": {
    Avalanche: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    Fuji: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
  },

  //Fuji tokens
  [TokenSymbols.STABLE1]: {
    Avalanche: "0x8Ba3e8F266D12f39d9930565B104893B307f9dd5",
    Fuji: "0x8Ba3e8F266D12f39d9930565B104893B307f9dd5",
  },
  [TokenSymbols.STABLE2]: {
    Avalanche: "0x3D55Ee8BdF297966E0bF3172057004F9dC17D4e2",
    Fuji: "0x3D55Ee8BdF297966E0bF3172057004F9dC17D4e2",
  },
  [TokenSymbols.STABLE3]: {
    Avalanche: "0x68Da82d3962ECc31599fCA43360A7D58959ff6C4",
    Fuji: "0x68Da82d3962ECc31599fCA43360A7D58959ff6C4",
  },
  [TokenSymbols.STABLE4]: {
    Avalanche: "0xF8407410836F4CA8bf3abCdae72740F3DAE28C7E",
    Fuji: "0xF8407410836F4CA8bf3abCdae72740F3DAE28C7E",
  },

  [TokenSymbols.STABLE5]: {
    Avalanche: "0xFEA4d0360d9422C54330aacc4AB90ef06e9A63df",
    Fuji: "0xFEA4d0360d9422C54330aacc4AB90ef06e9A63df",
  },
  [TokenSymbols.S3T]: {
    Avalanche: "0x4Ed45bEad84d1f76f620Df262F88477d7D27A420",
    Fuji: "0x4Ed45bEad84d1f76f620Df262F88477d7D27A420",
  },

  [TokenSymbols.P3T]: {
    Avalanche: "0xD3e8706cf9547f18756FDAF7015C97C2e6dEFCC3",
    Fuji: "0xD3e8706cf9547f18756FDAF7015C97C2e6dEFCC3",
  },
  [TokenSymbols.PGL]: {
    Avalanche: "0xdb7BC8c03c821ade48EF22F1047411FAd2A3e944",
    Fuji: "0xdb7BC8c03c821ade48EF22F1047411FAd2A3e944",
  },
  [TokenSymbols.AXIAL]: {
    Avalanche: "0xcF8419A615c57511807236751c0AF38Db4ba3351",
    Fuji: "0x0708f10f657b16abe18954361e96a641b217648b",
  },
};

export const tokenAddress = (key: TokenSymbols): string => {
  const address = tokenAddresses[key][networkName];
  if (!address)
    throw new Error(`Token ${key} not found for ${networkName} network`);
  return address;
};

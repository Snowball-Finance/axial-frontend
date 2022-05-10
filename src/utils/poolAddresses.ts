import { Pools } from "app/containers/Rewards/types";

export type NetworkName = "Fuji" | "Avalanche";
const networkName =
  process.env.REACT_APP_NETWORK_NAME || ("Avalanche" as NetworkName);

const poolAddresses: {
  [K in Pools]: {
    Avalanche: string;
    Fuji: string;
  };
} = {
  [Pools.AXIAL_AS4D]: {
    Avalanche: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
    Fuji: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
  },
  [Pools.AXIAL_AC4D]: {
    Avalanche: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
    Fuji: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
  },
  [Pools.AXIAL_JLP]: {
    Avalanche: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
    Fuji: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
  },
  [Pools.AXIAL_AM3D]: {
    Avalanche: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
    Fuji: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
  },
  [Pools.AXIAL_AA3D]: {
    Avalanche: "0x6EfbC734D91b229BE29137cf9fE531C1D3bf4Da6",
    Fuji: "0x6EfbC734D91b229BE29137cf9fE531C1D3bf4Da6",
  },
  [Pools.USDC_AM3D]: {
    Avalanche: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
    Fuji: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
  },
  //Fuji pools
  [Pools.T3P]: {
    Avalanche: "0xE730AFB0C84416e33f17a6C781e46E59C6780CC4",
    Fuji: "0xE730AFB0C84416e33f17a6C781e46E59C6780CC4",
  },
  [Pools.PGL]: {
    Avalanche: "0xdb7BC8c03c821ade48EF22F1047411FAd2A3e944",
    Fuji: "0xdb7BC8c03c821ade48EF22F1047411FAd2A3e944",
  },
  [Pools.TEST]: {
    Avalanche: "0xE68E161AA7A32403308cA0B29F15FEC1960c6ca9",
    Fuji: "0xE68E161AA7A32403308cA0B29F15FEC1960c6ca9",
  },
};
//@ts-ignore
const gaugeAddresses: {
  [K in Pools]: {
    Avalanche: string;
    Fuji: string;
  };
} = {
  [Pools.T3P]: {
    Avalanche: "0x015b16E27Ae7D4B409B44147f5AC08Ac8746e654",
    Fuji: "0x015b16E27Ae7D4B409B44147f5AC08Ac8746e654",
  },
  [Pools.PGL]: {
    Avalanche: "0x92ffd3c24F1660186d5F51c52bd54C31A578c81d",
    Fuji: "0x92ffd3c24F1660186d5F51c52bd54C31A578c81d",
  },
  [Pools.TEST]: {
    Avalanche: "0x6bb1e54489C26da81b5E3a15826d4c96faAa5Cbe",
    Fuji: "0x6bb1e54489C26da81b5E3a15826d4c96faAa5Cbe",
  },
};

//@ts-ignore
const swapAddresses: {
  [K in Pools]: {
    Avalanche: string;
    Fuji: string;
  };
} = {
  [Pools.USDC_AM3D]: {
    Avalanche: "0x26694e4047eA77cC96341f0aC491773aC5469d72",
    Fuji: "0x26694e4047eA77cC96341f0aC491773aC5469d72",
  },
  [Pools.T3P]: {
    Avalanche: "0x427BBe0E9D632b0285F046Ca36898D07F449452A",
    Fuji: "0x427BBe0E9D632b0285F046Ca36898D07F449452A",
  },
};

export const poolSwapAddress = (key: Pools): string => {
  if (!swapAddresses[key] || !swapAddresses[key][networkName]) {
    throw new Error(
      `swap address for Pool ${key} not found for ${networkName} network`
    );
  }
  const address = swapAddresses[key][networkName];
  return address;
};

export const poolAddress = (key: Pools): string => {
  const address = poolAddresses[key][networkName];
  if (!address)
    throw new Error(`Pool ${key} not found for ${networkName} network`);
  return address;
};
export const gaugeAddress = (key: Pools): string => {
  const address = gaugeAddresses[key][networkName];
  if (!address)
    throw new Error(
      `gaugeAddresses ${key} not found for ${networkName} network`
    );
  return address;
};

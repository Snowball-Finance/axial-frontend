import { Pools } from "app/containers/Rewards/types";

export type NetworkName = "Fuji" | "Avalanche";
const networkName =
  process.env.REACT_APP_NETORK_NAME || ("Avalanche" as NetworkName);

const poolAddresses: {
  [K in Pools]: {
    Avalanche: string;
    Fuji: string;
  };
} = {
  AXIAL_AS4D: {
    Avalanche: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
    Fuji: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
  },
  AXIAL_AC4D: {
    Avalanche: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
    Fuji: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
  },
  AXIAL_JLP: {
    Avalanche: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
    Fuji: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
  },
  AXIAL_AM3D: {
    Avalanche: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
    Fuji: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
  },
  AXIAL_AA3D: {
    Avalanche: "0x6EfbC734D91b229BE29137cf9fE531C1D3bf4Da6",
    Fuji: "0x6EfbC734D91b229BE29137cf9fE531C1D3bf4Da6",
  },
  USDC_AM3D: {
    Avalanche: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
    Fuji: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
  },
};
//@ts-ignore
const swapAddresses: {
  [K in Pools]: {
    Avalanche: string;
    Fuji: string;
  };
} = {
  USDC_AM3D: {
    Avalanche: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
    Fuji: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
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

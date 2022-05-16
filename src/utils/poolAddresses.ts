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
  [Pools.P3T]: {
    Avalanche: "0xD3e8706cf9547f18756FDAF7015C97C2e6dEFCC3",
    Fuji: "0xD3e8706cf9547f18756FDAF7015C97C2e6dEFCC3",
  },
  [Pools.PGL]: {
    Avalanche: "0xdb7BC8c03c821ade48EF22F1047411FAd2A3e944",
    Fuji: "0xdb7BC8c03c821ade48EF22F1047411FAd2A3e944",
  },
  [Pools.S3T]: {
    Avalanche: "0x4Ed45bEad84d1f76f620Df262F88477d7D27A420",
    Fuji: "0x4Ed45bEad84d1f76f620Df262F88477d7D27A420",
  },
};
//@ts-ignore
const gaugeAddresses: {
  [K in Pools]: {
    Avalanche: string;
    Fuji: string;
  };
} = {
  [Pools.P3T]: {
    Avalanche: "0x81195A398ea621991175967AED395e0B82605D1c",
    Fuji: "0x81195A398ea621991175967AED395e0B82605D1c",
  },
  [Pools.PGL]: {
    Avalanche: "0x92ffd3c24F1660186d5F51c52bd54C31A578c81d",
    Fuji: "0x92ffd3c24F1660186d5F51c52bd54C31A578c81d",
  },
  [Pools.S3T]: {
    Avalanche: "0x0797a8F7636DEE441b70B3f91D7D3217301401F3",
    Fuji: "0x0797a8F7636DEE441b70B3f91D7D3217301401F3",
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
  [Pools.P3T]: {
    Avalanche: "0x25949663b5C22e49e541eDEA98F70edB865f1Ec4",
    Fuji: "0x25949663b5C22e49e541eDEA98F70edB865f1Ec4",
  },
  [Pools.S3T]: {
    Avalanche: "0x80e20538A5f8347b94a9f617Fc568174C88821c2",
    Fuji: "0x80e20538A5f8347b94a9f617Fc568174C88821c2",
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

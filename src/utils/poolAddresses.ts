import { Pools } from "app/containers/Rewards/types";

export type NetworkName = "Fuji" | "Avalanche";
const networkName =
  process.env.REACT_APP_NETWORK_NAME || ("Avalanche" as NetworkName);


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
  [Pools.SCALES]:{
    Avalanche: "0xfD24d41B7C4C7C8Cd363Dd3FF6f49C99c8280430",
    Fuji: "0xfD24d41B7C4C7C8Cd363Dd3FF6f49C99c8280430",
  },
  [Pools.HERO]:{
    Avalanche: "0xa0f6397FEBB03021F9BeF25134DE79835a24D76e",
    Fuji: "0xa0f6397FEBB03021F9BeF25134DE79835a24D76e",
  },
  [Pools.AS4D]:{
    Avalanche: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
    Fuji: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
  },
  [Pools.AC4D]:{
    Avalanche: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
    Fuji: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
  },
  [Pools.AM3D]:{
    Avalanche: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
    Fuji: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
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


export const gaugeAddress = (key: Pools): string => {
  const address = gaugeAddresses[key][networkName];
  if (!address)
    throw new Error(
      `gaugeAddresses ${key} not found for ${networkName} network`
    );
  return address;
};

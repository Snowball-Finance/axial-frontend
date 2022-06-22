export type NetworkName = "Fuji" | "Avalanche";
export const networkName = (process.env.REACT_APP_NETWORK_NAME ||
  "Avalanche") as NetworkName;

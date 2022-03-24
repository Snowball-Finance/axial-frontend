import { Pool, PoolData, UserShareData } from "app/containers/Rewards/types";
import { Token, TokenSymbols } from "app/containers/Swap/types";

/* --- STATE --- */
export interface LiquidityPageState {
  pools: Pool[] | undefined;
  pool: Pool | undefined;
  poolTokens: Token[] | undefined;
  poolData: PoolData | undefined;
  userShareData: UserShareData | undefined;
  depositTokenAmounts: { [K in TokenSymbols]?: string };
  withdrawTokenAmounts: { [K in TokenSymbols]?: string };
  withdrawPercentage: number;
  selectedTokenToWithdraw: "combo" | TokenSymbols;
  depositRaw: boolean;
}

export interface PoolCardItemProps {
  poolKey: string;
}

export interface TokenImageProps {
  poolKey: string;
}

export interface PoolDataProps {
  poolKey: string;
}

export interface ActionButtonProps {
  poolKey: string;
}

export enum PoolsRouteIndex {
  AXIAL_AS4D_ROUTE = "as4d",
  AXIAL_AC4D_ROUTE = "ac4d",
  AXIAL_AM3D_ROUTE = "am3d",
  AXIAL_AA3D_ROUTE = "aa3d",
  AXIAL_JLP_ROUTE = "jlp",
  USDC_AM3D_ROUTE = "usdc-am3d",
}

export type ContainerState = LiquidityPageState;

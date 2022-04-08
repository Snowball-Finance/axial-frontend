import { Pool, PoolData, UserShareData } from "app/containers/Rewards/types";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import { BigNumber } from "ethers";

export enum TypeOfTokensToWithdraw {
  Combo = "combo",
  Mixed = "mixed",
}

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
  selectedTokenToWithdraw: TokenSymbols | TypeOfTokensToWithdraw;
  depositRaw: boolean;
  depositTransactionData: DepositTransactionData | undefined;
  withdrawReviewData: WithdrawReviewData | undefined;
  withdrawBonus: BigNumber | undefined;
  tokensAreApprovedForDeposit: boolean;
  tokensAreApprovedForWithdrawal: boolean;
  isCheckingForApproval: boolean;
  isApprovingTokens: boolean;
  isCalculatingForWithdrawal: boolean;
  withdrawError: { main: string } | undefined;
}

export interface WithdrawTokenAmountChangePayload {
  symbol: TokenSymbols;
  value: string;
}
export interface SelectTokenToWithdrawPayload {
  symbol: LiquidityPageState["selectedTokenToWithdraw"];
  shouldEffectInputs?: boolean;
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

interface FromTokens {
  symbol: string;
  value: string;
}

interface ToTokens {
  symbol: string;
  value: BigNumber;
}

export interface FromTransactionData {
  tokens: FromTokens[];
  total: number;
}

export interface DepositTransactionData {
  from: FromTransactionData;
  to: ToTokens;
  share: BigNumber | undefined;
}

export interface WithdrawReviewData {
  tokens: FromTokens[];
  total: number;
  deadline: number;
  gasPrice: string;
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

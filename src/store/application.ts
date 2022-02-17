import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";
import { MasterchefApr } from "../libs/getPoolsAPR";
import { SwapStatsReponse } from "../libs/getSwapStats";

interface GasPrices {
  gasStandard?: number;
  gasFast?: number;
  gasInstant?: number;
}
interface SwapStats {
  [swapAddress: string]: {
    oneDayVolume: number;
    apr: number;
    tvl: number;
    utilization: string;
  };
}
export interface TokenPricesUSD {
  [tokenSymbol: string]: number;
}
interface LastTransactionTimes {
  [transactionType: string]: number;
}

export interface AggregatorSwapParams {
  bestPath: BestPath;
  to: string;
  fee: BigNumber;
  useInternalRouter: boolean;
}

export interface BestPath {
  amountIn: BigNumber;
  amountOut: BigNumber;
  path: string[];
  adapters: string[];
}

export interface SwapInfo {
  isGettingBestPath: boolean;
  swapParams: AggregatorSwapParams | null;
  swapError: string | null;
}

type ApplicationState = GasPrices & { tokenPricesUSD?: TokenPricesUSD } & {
  lastTransactionTimes: LastTransactionTimes;
} & { swapStats?: SwapStats } & { masterchefApr?: MasterchefApr } & { swapInfo: SwapInfo };

const initialState: ApplicationState = {
  lastTransactionTimes: {},
  swapInfo: {
    isGettingBestPath: false,
    swapParams: null,
    swapError: null
  }
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setSwapInfo(state, action: PayloadAction<SwapInfo>) {
      state.swapInfo = { ...action.payload };
    },
    updateGasPrices(state, action: PayloadAction<GasPrices>): void {
      const { gasStandard, gasFast, gasInstant } = action.payload;
      state.gasStandard = gasStandard;
      state.gasFast = gasFast;
      state.gasInstant = gasInstant;
    },
    updateTokensPricesUSD(state, action: PayloadAction<TokenPricesUSD>): void {
      state.tokenPricesUSD = action.payload;
    },
    updateLastTransactionTimes(state, action: PayloadAction<LastTransactionTimes>): void {
      state.lastTransactionTimes = {
        ...state.lastTransactionTimes,
        ...action.payload
      };
    },
    updateMasterchefApr(state, action: PayloadAction<MasterchefApr>): void {
      state.masterchefApr = action.payload;
    },
    updateSwapStats(state, action: PayloadAction<SwapStatsReponse[]>): void {
      const formattedPayload = Object.values(action.payload).reduce((acc, data) => {
        if (isNaN(data.last_apr) || isNaN(data.last_vol)) {
          return acc;
        }
        const apr = data.last_apr;
        const tvl = 0;
        const oneDayVolume = data.last_vol;
        const utilization = 0;
        return {
          ...acc,
          [data.swapaddress]: {
            apr,
            tvl,
            oneDayVolume,
            utilization
          }
        };
      }, {});
      state.swapStats = formattedPayload;
    }
  }
});

export const { updateGasPrices, updateTokensPricesUSD, updateLastTransactionTimes, updateSwapStats, setSwapInfo, updateMasterchefApr } =
  applicationSlice.actions;

export default applicationSlice.reducer;

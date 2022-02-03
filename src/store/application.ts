import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BigNumber } from "ethers"
import { MasterchefApr } from "../libs/getPoolsAPR"
import { SwapStatsReponse } from "../libs/getSwapStats"

interface GasPrices {
  gasStandard?: number
  gasFast?: number
  gasInstant?: number
}
interface SwapStats {
  [swapAddress: string]: {
    oneDayVolume: number
    apr: number
    tvl: number
    utilization: string
  }
}
export interface TokenPricesUSD {
  [tokenSymbol: string]: number
}
interface LastTransactionTimes {
  [transactionType: string]: number
}

export interface BestPath {
  amountIn: BigNumber
  amountOut: BigNumber
  path: string[]
  adapters: string[]
}

export interface SwapRouterInfo {
  isGettingBestPath: boolean
  bestSwapPath: BestPath | null
  swapError: string | null
}

export type ApplicationState = GasPrices & {
  tokenPricesUSD?: TokenPricesUSD
} & {
  lastTransactionTimes: LastTransactionTimes
} & { swapStats?: SwapStats } & { masterchefApr?: MasterchefApr } & {
  swapRouterInfo: SwapRouterInfo
}

const initialState: ApplicationState = {
  lastTransactionTimes: {},
  swapRouterInfo: {
    isGettingBestPath: false,
    bestSwapPath: null,
    swapError: null,
  },
}

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setSwapRouterInfo(state, action: PayloadAction<SwapRouterInfo>) {
      state.swapRouterInfo = { ...action.payload }
    },
    updateGasPrices(state, action: PayloadAction<GasPrices>): void {
      const { gasStandard, gasFast, gasInstant } = action.payload
      state.gasStandard = gasStandard
      state.gasFast = gasFast
      state.gasInstant = gasInstant
    },
    updateTokensPricesUSD(state, action: PayloadAction<TokenPricesUSD>): void {
      state.tokenPricesUSD = action.payload
    },
    updateLastTransactionTimes(
      state,
      action: PayloadAction<LastTransactionTimes>,
    ): void {
      state.lastTransactionTimes = {
        ...state.lastTransactionTimes,
        ...action.payload,
      }
    },
    updateMasterchefApr(state, action: PayloadAction<MasterchefApr>): void {
      state.masterchefApr = action.payload
    },
    updateSwapStats(state, action: PayloadAction<SwapStatsReponse[]>): void {
      const formattedPayload = Object.values(action.payload).reduce(
        (acc, data) => {
          if (isNaN(data.last_apr) || isNaN(data.last_vol)) {
            return acc
          }
          const apr = data.last_apr
          const tvl = 0
          const oneDayVolume = data.last_vol
          const utilization = 0
          return {
            ...acc,
            [data.swapaddress]: {
              apr,
              tvl,
              oneDayVolume,
              utilization,
            },
          }
        },
        {},
      )
      state.swapStats = formattedPayload
    },
  },
})

export const {
  updateGasPrices,
  updateTokensPricesUSD,
  updateLastTransactionTimes,
  updateSwapStats,
  setSwapRouterInfo,
  updateMasterchefApr,
} = applicationSlice.actions

export default applicationSlice.reducer

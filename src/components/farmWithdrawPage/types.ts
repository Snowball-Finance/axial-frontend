import { BigNumber } from "ethers";

export interface FarmDataType {
  adminFee: BigNumber
  aParameter: BigNumber
  apy: number | null
  rapy: number | null
  name: string
  reserve: BigNumber | null
  swapFee: BigNumber
  tokens: {
    symbol: string,
    percent: string,
    value: BigNumber
  }[]
  totalLocked: BigNumber
  utilization: BigNumber | null
  virtualPrice: BigNumber
  volume: number | null
  isPaused: boolean
  lpTokenPriceUSD: BigNumber
  lpToken: string
}

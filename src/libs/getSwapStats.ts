import { AppDispatch } from "../store"
import retry from "async-retry"
import { updateSwapStats } from "../store/application"

const swapStatsURI = process.env.REACT_APP_ANALYTICS_API ?? ""

export interface SwapStatsReponse {
  symbol: string
  tokenaddress: string
  swapaddress: string
  last_apr: number
  last_vol: number
}

const fetchSwapStatsNow = (): Promise<SwapStatsReponse[]> =>
  fetch(`${swapStatsURI}/pools`, { cache: "no-cache" })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      }
      throw new Error("Unable to fetch swap stats from API")
    })
    .then((body: SwapStatsReponse[]) => {
      return body
    })

export default async function fetchSwapStats(dispatch: AppDispatch): Promise<void> {
  const dispatchUpdate = (swapStats: SwapStatsReponse[]) => {
    dispatch(updateSwapStats(swapStats))
  }
  await retry(() => fetchSwapStatsNow().then(dispatchUpdate), {
    retries: 3,
  })
}

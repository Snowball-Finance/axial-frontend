import { SwapStatsReponse } from "../types";

const swapStatsURI = process.env.REACT_APP_ANALYTICS_API ?? "";

export const fetchSwapStatsNow = (): Promise<SwapStatsReponse[]> =>
  fetch(`${swapStatsURI}/pools`, { cache: "no-cache" })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error("Unable to fetch swap stats from API");
    })
    .then((body: SwapStatsReponse[]) => {
      return body;
    });

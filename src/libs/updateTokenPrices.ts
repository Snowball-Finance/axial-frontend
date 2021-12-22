import { AppDispatch } from "../store"
import { TOKENS_MAP } from "../constants"
import retry from "async-retry"
import { updateTokensPricesUSD } from "../store/application"

const coinGeckoAPI = "https://api.coingecko.com/api/v3/simple/price"

interface CoinGeckoReponse {
  [tokenSymbol: string]: {
    usd: number
  }
}
const otherTokens = {
  AVAX: "avalanche-2",
  "USDT.e": "tether",
  "DAI.e": "dai",
  "USDC.e": "usd-coin",
  TUSD: "true-usd",
  FRAX: "frax",
  TEDDY: "teddy",
  AXIAL: "axial-token",
  AVAI: "orca-avai",
  ORCA: "orcadao",
}

export default function fetchTokenPricesUSD(dispatch: AppDispatch): void {
  const tokens = Object.values(TOKENS_MAP)
  const tokenIds = Array.from(
    new Set(
      tokens.map(({ geckoId }) => geckoId).concat(Object.values(otherTokens)),
    ),
  )
  void retry(
    () =>
      fetch(`${coinGeckoAPI}?ids=${encodeURIComponent(
        tokenIds.join(","),
      )}&vs_currencies=usd
    `)
        .then((res) => res.json())
        .then((body: CoinGeckoReponse) => {
          const otherTokensResult = Object.keys(otherTokens).reduce(
            (acc, key) => {
              return {
                ...acc,
                [key]: body?.[otherTokens[key as keyof typeof otherTokens]].usd,
              }
            },
            {} as { [symbol: string]: number },
          )
          const result = tokens.reduce((acc, token) => {
            return { ...acc, [token.symbol]: body?.[token.geckoId]?.usd }
          }, otherTokensResult)
          dispatch(updateTokensPricesUSD(result))
        }),
    { retries: 3 },
  )
}

import CoinGecko from 'coingecko-api'

export const CoinGeckoClient = new CoinGecko();
export const geckoPrice = CoinGeckoClient.simple.price
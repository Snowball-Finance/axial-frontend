import CoinGecko from "coingecko-api";

export const CoinGeckoClient = new CoinGecko();
// eslint-disable-next-line @typescript-eslint/unbound-method
export const geckoPrice = CoinGeckoClient.simple.price;

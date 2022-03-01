const coinGeckoAPI = "https://api.coingecko.com/api/v3/simple/price";

export const getTokenPricesAPI = async (tokenIds: string[]) => {
  const res = await fetch(`${coinGeckoAPI}?ids=${encodeURIComponent(
    tokenIds.join(",")
  )}&vs_currencies=usd
`);
  const response = await res.json();
  return response;
};

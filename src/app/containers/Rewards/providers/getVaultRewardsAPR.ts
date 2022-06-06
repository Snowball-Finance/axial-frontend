import axios from "axios";

export async function getAVAXPrice(): Promise<number> {
  const query = JSON.stringify({
    query: `{ bundle(id:1){ ethPrice } }`,
    variables: {},
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      "https://api.thegraph.com/subgraphs/name/dasconnor/pangolin-dex",
      query,
      config
    );
    const AVAXPrice = response.data.data.bundle.ethPrice;
    if (!AVAXPrice) {
      throw new Error("AVAX price not found");
    }
    return AVAXPrice;
  } catch (error) {
    console.error("Error retriving AVAX price");
    return 0;
  }
}

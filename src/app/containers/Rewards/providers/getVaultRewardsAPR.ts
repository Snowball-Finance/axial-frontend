import { AxialLPData, ExtraTokens, MasterchefApr, PoolTypes } from "../types";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { rpcUrl } from "app/containers/BlockChain/utils/wallet/connectors";
import { pools } from "app/pools";
import lpAMM from "abi/lpTokenAMM.json";
import { ZERO_ADDRESS } from "../constants";
import masterchefABI from "abi/masterchef.json";
import swap from "abi/swapFlashLoanNoWithdrawFee.json";
import erc20 from "abi/erc20.json";
import simplerewarder from "abi/simplerewarder.json";
import {
  Masterchef,
  SwapFlashLoanNoWithdrawFee,
  Erc20,
} from "abi/ethers-contracts";

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

export async function getAXIALPriceWithLP(): Promise<AxialLPData> {
  const provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);

  const lpContract = new ethers.Contract(
    pools.AXIAL_JLP?.address || "",
    lpAMM,
    provider
  );
  const [reserves, AVAXPrice] = await Promise.all([
    lpContract.getReserves(),
    getAVAXPrice(),
  ]);
  const AxialQt = reserves._reserve1;
  const AVAXQt = reserves._reserve0;
  const axialAVAXPrice = AVAXQt / AxialQt;

  if (AVAXPrice) {
    const supply = (await lpContract.totalSupply()) / 1e18;
    const tvl = (reserves._reserve0 / 1e18) * AVAXPrice * 2;
    const tokenPoolPrice = tvl / supply;

    return {
      AXIALPrice: axialAVAXPrice * AVAXPrice,
      LPTVL: tvl,
      tokenPoolPrice,
    };
  } else {
    return {
      AXIALPrice: 0,
      LPTVL: 0,
      tokenPoolPrice: 0,
    };
  }
}

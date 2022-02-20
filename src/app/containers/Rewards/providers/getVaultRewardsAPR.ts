import {
  AxialLPData,
  ExtraTokens,
  MasterchefApr,
  PoolInfos,
  PoolTypes,
} from "../types";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { rpcUrl } from "app/containers/BlockChain/utils/wallet/connectors";
import { pools } from "app/pools";
import lpAMM from "abi/lpTokenAMM.json";
import { AXIAL_MASTERCHEF_CONTRACT_ADDRESS, ZERO_ADDRESS } from "../constants";
import masterchefABI from "abi/masterchef.json";
import swap from "abi/swapFlashLoanNoWithdrawFee.json";
import erc20 from "abi/erc20.json";
import simplerewarder from "abi/simplerewarder.json";

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const AVAXPrice = response.data.data.bundle.ethPrice as number;

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
  // eslint-disable-next-line
  const [reserves, AVAXPrice] = await Promise.all([
    lpContract.getReserves(),
    getAVAXPrice(),
  ]);
  // eslint-disable-next-line
  const AxialQt = reserves._reserve1;
  // eslint-disable-next-line
  const AVAXQt = reserves._reserve0;
  // eslint-disable-next-line
  const axialAVAXPrice = AVAXQt / AxialQt;

  if (AVAXPrice) {
    // eslint-disable-next-line
    const supply = (await lpContract.totalSupply()) / 1e18;
    // eslint-disable-next-line
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

export async function getVaultRewardAprNow(): Promise<MasterchefApr> {
  const { AXIALPrice, LPTVL, tokenPoolPrice } = await getAXIALPriceWithLP();

  let APRData: MasterchefApr = {};
  for (const pool of Object.values(pools)) {
    try {
      const provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
      const masterchefContract = new ethers.Contract(
        AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
        masterchefABI,
        provider
      );
      const swapTokenContract = new ethers.Contract(
        pool.address,
        swap,
        provider
      );
      const tokenContract = new ethers.Contract(
        pool.lpToken.address,
        erc20,
        provider
      );
      // eslint-disable-next-line
      const balanceToken = (await tokenContract.balanceOf(
        AXIAL_MASTERCHEF_CONTRACT_ADDRESS
      )) as BigNumber;

      let virtualPrice = BigNumber.from(0),
        TVL = 0;
      if (pool.poolType !== PoolTypes.LP) {
        try {
          // eslint-disable-next-line
          virtualPrice = await swapTokenContract.getVirtualPrice();
        } catch (error) {
          virtualPrice = ethers.utils.parseUnits("1", 18);
        }

        TVL = (+virtualPrice / 1e18) * (+balanceToken / 1e18);
      } else {
        TVL = tokenPoolPrice * (+balanceToken / 1e18);
      }

      const [totalAllocPoint, poolInfo, axialPerSecondRes] = await Promise.all([
        masterchefContract.totalAllocPoint(),
        masterchefContract.poolInfo(pool.lpToken.masterchefId),
        masterchefContract.axialPerSec(),
      ]);

      // eslint-disable-next-line
      const axialPerSecond: number = axialPerSecondRes / 1e18;

      let poolFraction = 0;
      if (+poolInfo.allocPoint > 0) {
        poolFraction = +poolInfo.allocPoint / +totalAllocPoint;
      }

      const extraTokens: ExtraTokens[] = [];
      if (poolInfo.rewarder !== ZERO_ADDRESS) {
        const rewarderContract = new ethers.Contract(
          poolInfo.rewarder,
          simplerewarder,
          provider
        );
        const [tokenPerSec, tokenAddress] = await Promise.all([
          rewarderContract.tokenPerSec(),
          rewarderContract.rewardToken(),
        ]);
        extraTokens.push({
          address: tokenAddress,
          tokenPerSec: tokenPerSec.toHexString(),
        });
      }

      const usdPerWeek = axialPerSecond * poolFraction * AXIALPrice * 604_800;
      const APRYearly = (usdPerWeek / TVL) * 100 * 52;

      APRData = {
        ...APRData,
        [pool.address]: {
          apr: APRYearly,
          lptvl: LPTVL,
          totalStaked: balanceToken.toHexString(),
          tokenPoolPrice: tokenPoolPrice,
          extraTokens: extraTokens,
        },
      };
    } catch (error) {
      console.error(`Error fetching Pool Reward APY for Pool: ${pool.address}`);
      APRData = {
        ...APRData,
        [pool.address]: {
          apr: 0,
          lptvl: 0,
          tokenPoolPrice: 0,
          totalStaked: "0x0",
          extraTokens: [],
        },
      };
    }
  }
  return APRData;
}

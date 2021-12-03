import {
  AXIAL_JLP_ADDRESS,
  AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
  POOLS_MAP,
  PoolTypes,
  ZERO_ADDRESS,
} from "../constants"
import { BigNumber, ethers } from "ethers"
import axios from "axios"
import erc20 from "../constants/abis/erc20.json"
import lpAMM from "../constants/abis/lpTokenAMM.json"
import masterchef from "../constants/abis/masterchef.json"
import swap from "../constants/abis/swapFlashLoanNoWithdrawFee.json"
import simplerewarder from "../constants/abis/simplerewarder.json"

export interface poolInfo {
  lpToken: string
  allocPoint: BigNumber
  lastRewardTimestamp: BigNumber
  accAxialPerShare: BigNumber
  rewarder: string
}

export interface AxialLPData {
  AXIALPrice: number,
  LPTVL: number,
  tokenPoolPrice: number
}

export interface ExtraTokens {
  address: string,
  tokenPerSec: string
}

export interface MasterchefApr {
  [swapAddress: string]: {
    apr: number,
    lptvl: number,
    totalStaked: string,
    tokenPoolPrice: number,
    extraTokens: ExtraTokens[],

  }
}

export async function getAVAXPrice(): Promise<number> {
  const query = JSON.stringify({
    query: `{ bundle(id:1){ ethPrice } }`,
    variables: {},
  })

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const response = await axios.post(
      "https://api.thegraph.com/subgraphs/name/dasconnor/pangolin-dex",
      query,
      config,
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const AVAXPrice = response.data.data.bundle.ethPrice as number

    return AVAXPrice
  } catch (error) {
    console.error("Error retriving AVAX price")
    return 0
  }
}

export async function getAXIALPriceWithLP(): Promise<AxialLPData> {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    process.env.REACT_APP_NETWORK_URL ?? "",
  )

  const lpContract = new ethers.Contract(
    AXIAL_JLP_ADDRESS[43114],
    lpAMM,
    provider,
  )
  // eslint-disable-next-line
  const reserves = await lpContract.getReserves()
  // eslint-disable-next-line
  const AxialQt = reserves._reserve1
  // eslint-disable-next-line
  const AVAXQt = reserves._reserve0
  // eslint-disable-next-line
  const axialAVAXPrice = AVAXQt / AxialQt
  const AVAXPrice = await getAVAXPrice()

  if (AVAXPrice) {
    // eslint-disable-next-line
    const supply = await lpContract.totalSupply() /1e18
    // eslint-disable-next-line
    const tvl = (reserves._reserve0 / 1e18) * AVAXPrice * 2 
    const tokenPoolPrice = tvl/supply

    return {
      AXIALPrice: axialAVAXPrice * AVAXPrice,
      LPTVL: tvl,
      tokenPoolPrice
    }
  } else {
    return {
      AXIALPrice: 0,
      LPTVL: 0,
      tokenPoolPrice: 0
    }
  }
}

export async function getVaultRewardAprNow(): Promise<MasterchefApr> {
  const { AXIALPrice, LPTVL, tokenPoolPrice } = await getAXIALPriceWithLP()

  let APRData: MasterchefApr = {}
  for (const pool of Object.values(POOLS_MAP)) {
    try {

      const provider = new ethers.providers.StaticJsonRpcProvider(
        process.env.REACT_APP_NETWORK_URL ?? "",
      )
      const masterchefContract = new ethers.Contract(
        AXIAL_MASTERCHEF_CONTRACT_ADDRESS[43114],
        masterchef,
        provider,
      )
      const swapTokenContract = new ethers.Contract(
        pool.addresses[43114],
        swap,
        provider,
      )
      const tokenContract = new ethers.Contract(
        pool.lpToken.addresses[43114],
        erc20,
        provider,
      )
      // eslint-disable-next-line
      const balanceToken = await tokenContract.balanceOf(
        AXIAL_MASTERCHEF_CONTRACT_ADDRESS[43114]
      ) as BigNumber

      let virtualPrice = BigNumber.from(0), TVL = 0
      if(pool.type !== PoolTypes.LP) {
        // eslint-disable-next-line
        virtualPrice = await swapTokenContract.getVirtualPrice()
        TVL = (+virtualPrice / 1e18) * (+balanceToken / 1e18)
      } else {
        TVL = tokenPoolPrice * (+balanceToken / 1e18)
      }

      // eslint-disable-next-line
      const totalAllocPoint: BigNumber = await masterchefContract.totalAllocPoint()
      // eslint-disable-next-line
      const poolInfo: poolInfo = await masterchefContract.poolInfo(pool.lpToken.masterchefId)
      // eslint-disable-next-line
      const axialPerSecond: number = await masterchefContract.axialPerSec() / 1e18

      let poolFraction = 0
      if(+poolInfo.allocPoint > 0) {
        poolFraction = +poolInfo.allocPoint / +totalAllocPoint
      }

      const extraTokens:ExtraTokens[] = []
      if(poolInfo.rewarder !== ZERO_ADDRESS) {
        const rewarderContract = new ethers.Contract(
          poolInfo.rewarder,
          simplerewarder,
          provider,
        )
        // eslint-disable-next-line
        const tokenPerSec:BigNumber = await rewarderContract.tokenPerSec();
        // eslint-disable-next-line
        const tokenAddress:string = await rewarderContract.rewardToken();
        extraTokens.push({
          address: tokenAddress,
          tokenPerSec: tokenPerSec.toHexString()
        })
      }
  
      const usdPerWeek = axialPerSecond * poolFraction * AXIALPrice * 604_800
      const APRYearly = (usdPerWeek / TVL) * 100 * 52

      APRData = {
        ...APRData,
        [pool.addresses[43114]]: {
          apr: APRYearly,
          lptvl: LPTVL,
          totalStaked: balanceToken.toHexString(),
          tokenPoolPrice: tokenPoolPrice,
          extraTokens: extraTokens
        }
      }
    } catch (error) {
      console.error(`Error fetching Pool Reward APY for Pool: ${pool.addresses[43114]}`)
      APRData = {
        ...APRData,
        [pool.addresses[43114]]: {
          apr: 0,
          lptvl: 0,
          tokenPoolPrice: 0,
          totalStaked: "0x0",
          extraTokens: []
        }
      } 
    }
  }
  return APRData

}

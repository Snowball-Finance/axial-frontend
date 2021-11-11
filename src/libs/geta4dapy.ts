import {
  AXIAL_LP_ADDRESS,
  AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
  POOLS_MAP,
} from "../constants"
import { BigNumber, ethers } from "ethers"
import axios from "axios"
import erc20 from "../constants/abis/erc20.json"
import lpAMM from "../constants/abis/lpTokenAMM.json"
import masterchef from "../constants/abis/masterchef.json"
import swap from "../constants/abis/swapFlashLoanNoWithdrawFee.json"

export interface poolInfo {
  lpToken: string
  allocPoint: BigNumber
  lastRewardTimestamp: BigNumber
  accAxialPerShare: BigNumber
  rewarder: string
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

export async function getAXIALPriceWithLP(): Promise<number> {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    process.env.REACT_APP_NETWORK_URL ?? "",
  )

  const lpContract = new ethers.Contract(
    AXIAL_LP_ADDRESS[43114],
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
    return axialAVAXPrice * AVAXPrice
  } else {
    return 0
  }
}

interface MastechefApr {
  [swapAddress: string]: number
}

export async function getVaultRewardAprNow(): Promise<MastechefApr> {

  let APRData:MastechefApr = {}
  try {
    for (const pool of Object.values(POOLS_MAP)) {
      console.log(pool)

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
      const balanceToken = await tokenContract.balanceOf(AXIAL_MASTERCHEF_CONTRACT_ADDRESS[43114]) / 1e18
      // eslint-disable-next-line
      const virtualPrice: BigNumber = await swapTokenContract.getVirtualPrice()
      const TVL = (+virtualPrice / 1e18) * balanceToken

      // eslint-disable-next-line
      const totalAllocPoint: BigNumber = await masterchefContract.totalAllocPoint()
      // eslint-disable-next-line
      const poolInfo: poolInfo = await masterchefContract.poolInfo(pool.lpToken.masterchefId)
      // eslint-disable-next-line
      const axialPerSecond: number = await masterchefContract.axialPerSec() / 1e18

      const poolFraction = +poolInfo.allocPoint / +totalAllocPoint
      const axialPrice = await getAXIALPriceWithLP()

      const usdPerWeek = axialPerSecond * poolFraction * axialPrice * 604_800
      const APRYearly = (usdPerWeek / TVL) * 100 * 52

      APRData = {
        ...APRData,
        [pool.addresses[43114]]: APRYearly
      }

    }
    return APRData
  } catch (error) {
    console.error("Error fetching Pool Reward APY")
    return {}
  }
}

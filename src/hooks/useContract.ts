import {
  AXIAL_AS4D_SWAP_TOKEN,
  AXIAL_AC4D_SWAP_TOKEN,
  DAI,
  FRAX,
  MIM,
  POOLS_MAP,
  PoolName,
  TSD,
  TUSD,
  Token,
  USDCe,
  USDT,
  AXIAL_JLP_POOL_TOKEN,
  PoolTypes,
  AXIAL_AM3D_SWAP_TOKEN,
  AXIAL_AA3D_SWAP_TOKEN,
  AVAI,
  isMetaPool,
  USDC,
  USDC_AM3D_SWAP_TOKEN,
} from "../constants"

import { Contract } from "@ethersproject/contracts"
import ERC20_ABI from "../constants/abis/erc20.json"
import { Erc20 } from "../../types/ethers-contracts/Erc20"
import LPTOKEN_UNGUARDED_ABI from "../constants/abis/lpTokenUnguarded.json"
import METASWAP_DEPOSIT_ABI from "../constants/abis/metaSwapDeposit.json"
import { LpTokenGuarded } from "../../types/ethers-contracts/LpTokenGuarded"
import { LpTokenUnguarded } from "../../types/ethers-contracts/LpTokenUnguarded"
import { MetaSwapDeposit } from "../../types/ethers-contracts/MetaSwapDeposit"
import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "../constants/abis/swapFlashLoanNoWithdrawFee.json"
import SWAP_ROUTER_ABI from "../constants/abis/swapRouter.json"
import { SwapFlashLoanNoWithdrawFee } from "../../types/ethers-contracts/SwapFlashLoanNoWithdrawFee"
import { SwapRouter } from "../../types/ethers-contracts/SwapRouter"
import { getContract } from "../libs"
import { useActiveWeb3React } from "./index"
import { useMemo } from "react"

// returns null on errors
function useContract(
  address: string | undefined,
  ABI: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  withSignerIfPossible = true,
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      )
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(
  t: Token,
  withSignerIfPossible?: boolean,
): Contract | null {
  const { chainId } = useActiveWeb3React()
  const tokenAddress = chainId ? t.addresses[chainId] : undefined
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useSwapContract(
  poolName?: PoolName,
): SwapFlashLoanNoWithdrawFee | MetaSwapDeposit | null {
  const { chainId, account, library } = useActiveWeb3React()
  return useMemo(() => {
    if (!poolName || !library || !chainId) return null
    try {
      const pool = POOLS_MAP[poolName]
      if (pool.type === PoolTypes.LP) {
        return null
      }
      if (isMetaPool(poolName)) {
        return getContract(
          pool.addresses[chainId],
          METASWAP_DEPOSIT_ABI,
          library,
          account ?? undefined,
        ) as MetaSwapDeposit
      } else if (pool) {
        return getContract(
          pool.addresses[chainId],
          SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          library,
          account ?? undefined,
        ) as SwapFlashLoanNoWithdrawFee
      } else {
        return null
      }
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [chainId, library, account, poolName])
}

export function useSwapRouterContract(): SwapRouter | null {
  const { chainId, account, library } = useActiveWeb3React()
  return useMemo(() => {
    if (!library || !chainId) return null
    try {
      return getContract(
        "0xC4729E56b831d74bBc18797e0e17A295fA77488c",
        SWAP_ROUTER_ABI,
        library,
        account ?? undefined,
      ) as SwapRouter
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [chainId, library, account])
}

export function useLPTokenContract<T extends PoolName>(
  poolName: T,
): LpTokenUnguarded | null

export function useLPTokenContract(
  poolName: PoolName,
): LpTokenUnguarded | null {
  const { chainId, account, library } = useActiveWeb3React()
  return useMemo(() => {
    if (!poolName || !library || !chainId) return null
    try {
      const pool = POOLS_MAP[poolName]
      return getContract(
        pool.lpToken.addresses[chainId],
        LPTOKEN_UNGUARDED_ABI,
        library,
        account ?? undefined,
      ) as LpTokenUnguarded
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [chainId, library, account, poolName])
}

interface AllContractsObject {
  [x: string]: LpTokenGuarded | LpTokenUnguarded | Erc20 | null
}

export function useAllContracts(): AllContractsObject | null {
  const daiContract = useTokenContract(DAI) as Erc20
  const tusdContract = useTokenContract(TUSD) as Erc20
  const usdtContract = useTokenContract(USDT) as Erc20
  const fraxContract = useTokenContract(FRAX) as Erc20
  const usdceContract = useTokenContract(USDCe) as Erc20
  const tsdContract = useTokenContract(TSD) as Erc20
  const mimContract = useTokenContract(MIM) as Erc20
  const avaiContract = useTokenContract(AVAI) as Erc20
  const usdcContract = useTokenContract(USDC) as Erc20

  const axialas4dSwapTokenContract = useTokenContract(
    AXIAL_AS4D_SWAP_TOKEN,
  ) as LpTokenUnguarded

  const axialac4dSwapTokenContract = useTokenContract(
    AXIAL_AC4D_SWAP_TOKEN,
  ) as LpTokenUnguarded

  const axialam3dSwapTokenContract = useTokenContract(
    AXIAL_AM3D_SWAP_TOKEN,
  ) as LpTokenUnguarded

  const axialaa3dSwapTokenContract = useTokenContract(
    AXIAL_AA3D_SWAP_TOKEN,
  ) as LpTokenUnguarded

  const usdcAm3dSwapTokenContract = useTokenContract(
    USDC_AM3D_SWAP_TOKEN,
  ) as LpTokenUnguarded

  const axialjlpTokenContract = useTokenContract(
    AXIAL_JLP_POOL_TOKEN,
  ) as LpTokenUnguarded

  return useMemo(() => {
    if (
      ![
        daiContract,
        tusdContract,
        usdtContract,
        usdcContract,
        usdceContract,
        fraxContract,
        tsdContract,
        mimContract,
        avaiContract,
        axialas4dSwapTokenContract,
        axialac4dSwapTokenContract,
        axialam3dSwapTokenContract,
        axialaa3dSwapTokenContract,
        usdcAm3dSwapTokenContract,
        axialjlpTokenContract,
      ].some(Boolean)
    )
      return null
    return {
      [DAI.symbol]: daiContract,
      [TUSD.symbol]: tusdContract,
      [USDT.symbol]: usdtContract,
      [USDC.symbol]: usdcContract,
      [USDCe.symbol]: usdceContract,
      [FRAX.symbol]: fraxContract,
      [TSD.symbol]: tsdContract,
      [MIM.symbol]: mimContract,
      [AVAI.symbol]: avaiContract,
      [AXIAL_AS4D_SWAP_TOKEN.symbol]: axialas4dSwapTokenContract,
      [AXIAL_AC4D_SWAP_TOKEN.symbol]: axialac4dSwapTokenContract,
      [AXIAL_AM3D_SWAP_TOKEN.symbol]: axialam3dSwapTokenContract,
      [AXIAL_AA3D_SWAP_TOKEN.symbol]: axialaa3dSwapTokenContract,
      [USDC_AM3D_SWAP_TOKEN.symbol]: usdcAm3dSwapTokenContract,
      [AXIAL_JLP_POOL_TOKEN.symbol]: axialjlpTokenContract,
    }
  }, [
    daiContract,
    tusdContract,
    usdtContract,
    usdcContract,
    usdceContract,
    fraxContract,
    tsdContract,
    mimContract,
    avaiContract,
    axialas4dSwapTokenContract,
    axialac4dSwapTokenContract,
    axialam3dSwapTokenContract,
    axialaa3dSwapTokenContract,
    usdcAm3dSwapTokenContract,
    axialjlpTokenContract,
  ])
}

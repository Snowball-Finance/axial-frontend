import {
  AXIAL_A4D_POOL_NAME,
  AXIAL_A4D_SWAP_TOKEN,
  AXIAL_AC4D_POOL_NAME,
  AXIAL_AC4D_SWAP_TOKEN,
  DAI,
  FRAX,
  MIM,
  POOLS_MAP,
  PoolName,
  TSD,
  TUSD,
  Token,
  USDC,
  USDT,
} from "../constants"

import { Contract } from "@ethersproject/contracts"
import ERC20_ABI from "../constants/abis/erc20.json"
import { Erc20 } from "../../types/ethers-contracts/Erc20"
import LPTOKEN_UNGUARDED_ABI from "../constants/abis/lpTokenUnguarded.json"
import { LpTokenGuarded } from "../../types/ethers-contracts/LpTokenGuarded"
import { LpTokenUnguarded } from "../../types/ethers-contracts/LpTokenUnguarded"
import { MetaSwapDeposit } from "../../types/ethers-contracts/MetaSwapDeposit"
import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "../constants/abis/swapFlashLoanNoWithdrawFee.json"
import { SwapFlashLoan } from "../../types/ethers-contracts/SwapFlashLoan"
import { SwapFlashLoanNoWithdrawFee } from "../../types/ethers-contracts/SwapFlashLoanNoWithdrawFee"
import { SwapGuarded } from "../../types/ethers-contracts/SwapGuarded"
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

export function useSwapContract<T extends PoolName>(
  poolName?: T,
): T extends typeof AXIAL_A4D_POOL_NAME | typeof AXIAL_AC4D_POOL_NAME
  ? SwapFlashLoanNoWithdrawFee | null
  : SwapFlashLoan | SwapGuarded | MetaSwapDeposit | null
export function useSwapContract(
  poolName?: PoolName,
):
  | SwapGuarded
  | SwapFlashLoan
  | SwapFlashLoanNoWithdrawFee
  | MetaSwapDeposit
  | null {
  const { chainId, account, library } = useActiveWeb3React()
  return useMemo(() => {
    if (!poolName || !library || !chainId) return null
    try {
      const pool = POOLS_MAP[poolName]
      if (pool) {
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

export function useLPTokenContract<T extends PoolName>(
  poolName: T,
): T extends typeof AXIAL_A4D_POOL_NAME | typeof AXIAL_AC4D_POOL_NAME
  ? LpTokenGuarded | null
  : LpTokenUnguarded | null

export function useLPTokenContract(
  poolName: PoolName,
): LpTokenUnguarded | LpTokenGuarded | null {
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
  const usdcContract = useTokenContract(USDC) as Erc20
  const tsdContract = useTokenContract(TSD) as Erc20
  const mimContract = useTokenContract(MIM) as Erc20

  const axiala4dSwapTokenContract = useTokenContract(
    AXIAL_A4D_SWAP_TOKEN,
  ) as LpTokenUnguarded

  const axialac4dSwapTokenContract = useTokenContract(
    AXIAL_AC4D_SWAP_TOKEN,
  ) as LpTokenUnguarded

  return useMemo(() => {
    if (
      ![
        daiContract,
        tusdContract,
        usdtContract,
        usdcContract,
        fraxContract,
        tsdContract,
        mimContract,
        axiala4dSwapTokenContract,
        axialac4dSwapTokenContract,
      ].some(Boolean)
    )
      return null
    return {
      [DAI.symbol]: daiContract,
      [TUSD.symbol]: tusdContract,
      [USDT.symbol]: usdtContract,
      [USDC.symbol]: usdcContract,
      [FRAX.symbol]: fraxContract,
      [TSD.symbol]: tsdContract,
      [MIM.symbol]: mimContract,
      [AXIAL_A4D_SWAP_TOKEN.symbol]: axiala4dSwapTokenContract,
      [AXIAL_AC4D_SWAP_TOKEN.symbol]: axialac4dSwapTokenContract,
    }
  }, [
    daiContract,
    tusdContract,
    usdtContract,
    usdcContract,
    fraxContract,
    tsdContract,
    mimContract,
    axiala4dSwapTokenContract,
    axialac4dSwapTokenContract,
  ])
}

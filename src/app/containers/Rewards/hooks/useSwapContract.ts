import { isMetaPool, PoolName, POOLS_MAP, PoolTypes } from "app/constants";
import { getContract } from "app/containers/utils/contractUtils";
import { useMemo } from "react";
import METASWAP_DEPOSIT_ABI from "abi/metaSwapDeposit.json";
import SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI from "abi/swapFlashLoanNoWithdrawFee.json";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { useSelector } from "react-redux";

export function useSwapContract(poolName?: PoolName) {
  const { account, chainId, library } = useSelector(Web3Selectors.selectWeb3);

  return useMemo(() => {
    if (!poolName || !library || !chainId) return null;
    try {
      const pool = POOLS_MAP[poolName];
      if (pool.type === PoolTypes.LP) {
        return null;
      }
      if (isMetaPool(poolName)) {
        return getContract(
          pool.addresses[chainId],
          METASWAP_DEPOSIT_ABI,
          library,
          account ?? undefined
        );
      } else if (pool) {
        return getContract(
          pool.addresses[chainId],
          SWAP_FLASH_LOAN_NO_WITHDRAW_FEE_ABI,
          library,
          account ?? undefined
        );
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [chainId, library, account, poolName]);
}

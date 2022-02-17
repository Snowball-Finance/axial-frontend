import { POOLS_MAP, PoolName, PoolTypes } from "../constants"
import { getMultiContractData, getPoolsTVL } from "../libs/multicall"
import { useEffect, useState } from "react"

import { AppState } from "../store"
import { BigNumber } from "@ethersproject/bignumber"
import { parseUnits } from "@ethersproject/units"
import { useActiveWeb3React } from "."
import { useSelector } from "react-redux"

export default function usePoolTVLs(): { [poolName in PoolName]?: BigNumber } {
  const { chainId, library } = useActiveWeb3React()
  const { tokenPricesUSD } = useSelector((state: AppState) => state.application)
  const [poolTvls, setPoolTvls] = useState<{ [poolName in PoolName]?: BigNumber }>({})

  useEffect(() => {
    if (
      Object.keys(poolTvls).length > 0 //&& // only run once
      //tokenPricesUSD?.BTC &&
      //tokenPricesUSD?.ETH
    )
      return
    async function fetchTVLs() {
      if (!library || !chainId) return

      const pools = Object.values(POOLS_MAP)
      const contractCalls = pools.map((p) => {
        return getPoolsTVL(p.lpToken.addresses[chainId])
      })

      const tvls = await getMultiContractData(library, contractCalls)

      const tvlsUSD = pools.map((pool) => {
        const tvlAmount = tvls[pool.lpToken.addresses[chainId]].totalSupply // eslint-disable-line
        let tokenValue = 0
        if (pool.type === PoolTypes.BTC) {
          tokenValue = tokenPricesUSD?.BTC || 0
        } else if (pool.type === PoolTypes.ETH) {
          tokenValue = tokenPricesUSD?.ETH || 0
        } else {
          tokenValue = 1 // USD
        }
        return parseUnits(tokenValue.toFixed(2), 2).mul(tvlAmount).div(BigNumber.from(10).pow(2)) //1e18
      })
      setPoolTvls((prevState) => {
        return pools.reduce(
          (acc, pool, i) => ({
            ...acc,
            [pool.name]: tvlsUSD[i],
          }),
          prevState,
        )
      })
    }
    void fetchTVLs()
  }, [chainId, library, tokenPricesUSD, poolTvls])
  return poolTvls
}

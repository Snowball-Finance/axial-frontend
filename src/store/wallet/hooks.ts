import {
  ContractCall,
  getMultiContractData,
  getUserBalance,
  getUserMasterchefInfo,
} from "../../libs/multicall"
import { BigNumber } from "@ethersproject/bignumber"
import { TOKENS_MAP } from "../../constants"
import { useActiveWeb3React } from "../../hooks"
import usePoller from "../../hooks/usePoller"
import { useState } from "react"

export interface userInfo {
  amount: BigNumber
  rewardDebt: BigNumber
}

export function useMasterchefBalances(): { [token: string]: userInfo } | null {
  const { account, chainId, library } = useActiveWeb3React()
  const [masterchefBalances, setMasterchefBalances] = useState<{
    [token: string]: userInfo
  }>({})

  usePoller((): void => {
    async function pollBalances(): Promise<void> {
      if (!library || !chainId || !account) return

      const tokens = Object.values(TOKENS_MAP)

      const masterchefBalancesCall: ContractCall[] = []
      const tokenAddressList: string[] = []
      tokens.forEach((token) => {
        if (token.isLPToken) {
          masterchefBalancesCall.push(
            getUserMasterchefInfo(account, token.masterchefId, chainId),
          )
          tokenAddressList.push(token.addresses[chainId])
        }
      })
      const mBalances = await getMultiContractData(
        library,
        masterchefBalancesCall,
        tokenAddressList,
      )

      const _info: userInfo = {
        amount: BigNumber.from("0"),
        rewardDebt: BigNumber.from("0"),
      }

      setMasterchefBalances(
        tokens.reduce(
          (acc, t) => ({
            ...acc,
            [t.symbol]: mBalances[t.addresses[chainId]]?.userInfo, // eslint-disable-line
          }),
          { _info: _info },
        ),
      )
    }
    if (account) {
      void pollBalances()
    }
  }, 15000)

  return masterchefBalances
}

export function usePoolTokenBalances(): { [token: string]: BigNumber } | null {
  const { account, chainId, library } = useActiveWeb3React()
  const [balances, setBalances] = useState<{ [token: string]: BigNumber }>({})

  usePoller((): void => {
    async function pollBalances(): Promise<void> {
      if (!library || !chainId || !account) return

      const ethBalance = await library.getBalance(account)
      const tokens = Object.values(TOKENS_MAP)

      const balanceCalls = tokens.map((token) => {
        return getUserBalance(account, token.addresses[chainId])
      })
      const balances = await getMultiContractData(library, balanceCalls)

      setBalances(
        tokens.reduce(
          (acc, t) => ({
            ...acc,
            [t.symbol]: balances[t.addresses[chainId]].balanceOf, // eslint-disable-line
          }),
          { ETH: ethBalance },
        ),
      )
    }
    if (account) {
      void pollBalances()
    }
  }, 15000)

  return balances
}

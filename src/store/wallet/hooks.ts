import { ContractCall, getMultiContractData, getUserBalance, getUserMasterchefInfo } from "../../libs/multicall"
import { BigNumber } from "@ethersproject/bignumber"
import { TOKENS_MAP } from "../../constants"
import { useActiveWeb3React } from "../../hooks"
import usePoller from "../../hooks/usePoller"
import { useState } from "react"

interface PoolInfo {
  amount: BigNumber
  rewardDebt: BigNumber
}

export interface PendingTokens {
  pendingAxial: BigNumber
  bonusTokenAddress: string
  bonusTokenSymbol: string
  pendingBonusToken: BigNumber
}

export interface MasterchefResponse {
  userInfo: PoolInfo
  pendingTokens: PendingTokens
}

export function useMasterchefBalances(): {
  [token: string]: MasterchefResponse
} | null {
  const { account, chainId, library } = useActiveWeb3React()
  const [masterchefBalances, setMasterchefBalances] = useState<{
    [token: string]: MasterchefResponse
  }>({})

  usePoller((): void => {
    async function pollBalances(): Promise<void> {
      if (!library || !chainId || !account) return

      const tokens = Object.values(TOKENS_MAP)

      const masterchefBalancesCall: ContractCall[] = []
      const tokenAddressList: string[] = []
      tokens.forEach((token) => {
        if (token.isLPToken) {
          masterchefBalancesCall.push(getUserMasterchefInfo(account, token.masterchefId, chainId))
          tokenAddressList.push(token.addresses[chainId])
        }
      })
      const mBalances = await getMultiContractData(library, masterchefBalancesCall, tokenAddressList)

      const _info: MasterchefResponse = {
        userInfo: {
          amount: BigNumber.from("0"),
          rewardDebt: BigNumber.from("0"),
        },
        pendingTokens: {
          bonusTokenAddress: "",
          bonusTokenSymbol: "",
          pendingAxial: BigNumber.from("0"),
          pendingBonusToken: BigNumber.from("0"),
        },
      }

      setMasterchefBalances(
        tokens.reduce(
          (acc, t) => ({
            ...acc,
            [t.symbol]: {
              userInfo: {
                amount: mBalances[t.addresses[chainId]]?.userInfo[0], // eslint-disable-line
                rewardDebt: mBalances[t.addresses[chainId]]?.userInfo[1], // eslint-disable-line
              },
              pendingTokens: {
                pendingAxial: mBalances[t.addresses[chainId]]?.pendingTokens[0], // eslint-disable-line
                bonusTokenAddress: mBalances[t.addresses[chainId]]?.pendingTokens[1], // eslint-disable-line
                bonusTokenSymbol: mBalances[t.addresses[chainId]]?.pendingTokens[2], // eslint-disable-line
                pendingBonusToken: mBalances[t.addresses[chainId]]?.pendingTokens[3], // eslint-disable-line
              },
            },
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

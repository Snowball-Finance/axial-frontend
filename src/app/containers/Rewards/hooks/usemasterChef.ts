import { PoolName, POOLS_MAP, Token } from "app/constants";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { ContractCall, getMultiContractData, getUserMasterchefInfo } from "app/containers/utils/multicall";
import { BigNumber } from "ethers";
import { useState } from "react";
import { useSelector } from "react-redux";
import usePoller from "./usePoller";

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
export type TokensMap = {
  [symbol: string]: Token
}

export const TOKENS_MAP = Object.keys(POOLS_MAP).reduce((acc, poolName) => {
  const pool = POOLS_MAP[poolName as PoolName]
  const newAcc = { ...acc }
  pool.poolTokens.forEach((token) => {
    newAcc[token.symbol] = token
  })
  newAcc[pool.lpToken.symbol] = pool.lpToken
  return newAcc
}, {} as TokensMap)


export function useMasterchefBalances(): {
  [token: string]: MasterchefResponse
} | null {
  const { account, chainId, library } = useSelector(Web3Selectors.selectWeb3)
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
                bonusTokenAddress:
                  mBalances[t.addresses[chainId]]?.pendingTokens[1], // eslint-disable-line
                bonusTokenSymbol:
                  mBalances[t.addresses[chainId]]?.pendingTokens[2], // eslint-disable-line
                pendingBonusToken:
                  mBalances[t.addresses[chainId]]?.pendingTokens[3], // eslint-disable-line
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
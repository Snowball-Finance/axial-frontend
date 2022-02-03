/**
 *
 * BlockChain
 *
 */

import React, { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Ethers } from "./Ethers"
import { Web3 } from "./Web3"
import { selectCalculatedContracts } from "./selectors"
import { BlockChainActions, useBlockChainSlice } from "./slice"
import { Governance } from "./Governance"
import { DistributorData } from "./Governance/Staking/types"

interface BlockChainProps {
  mainTokenABI: any
  governance?: {
    tokenABI: any
    proposalsQuery: string
    governanceABI: any
    staking?: {
      feeDistributorABI: any
      otherDistributors?: DistributorData[]
    }
  }
}

export const BlockChain: FC<BlockChainProps> = ({
  governance,
  mainTokenABI,
}) => {
  const variables = {
    MAIN_TOKEN_ADDRESS: process.env.REACT_APP_MAIN_TOKEN_ADDRESS,
    MAIN_TOKEN_NAME: process.env.REACT_APP_MAIN_TOKEN_NAME,
  }

  for (const key in variables) {
    //@ts-ignore
    if (!variables[key]) {
      throw new Error(`REACT_APP_${key} is not set in .env for the governance`)
    }
  }

  useBlockChainSlice()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(BlockChainActions.setMainTokenABI(mainTokenABI))
    return () => {}
  }, [])

  const { mainTokenContract } = useSelector(selectCalculatedContracts)

  useEffect(() => {
    if (governance) {
      dispatch(BlockChainActions.setIncludesGovernance(true))
    }
    if (mainTokenContract) {
      dispatch(
        BlockChainActions.setContracts({
          mainTokenContract: mainTokenContract,
        }),
      )
    }
  }, [mainTokenContract])

  return (
    <>
      <Web3 />
      <Ethers />
      {governance && (
        <Governance
          proposalsQuery={governance.proposalsQuery}
          tokenABI={governance.tokenABI}
          governanceABI={governance.governanceABI}
          staking={{
            feeDistributorABI: governance.staking?.feeDistributorABI,
            otherDistributors: governance.staking?.otherDistributors,
          }}
        />
      )}
    </>
  )
}

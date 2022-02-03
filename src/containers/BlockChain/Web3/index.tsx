/**
 *
 * Web3
 *
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useWeb3Slice, Web3Actions } from "./slice"
import { useWeb3React, Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"

const Core = () => {
  useWeb3Slice()
  const dispatch = useDispatch()
  const {
    active,
    activate,
    deactivate,
    account,
    connector,
    library,
    chainId,
    error,
  } = useWeb3React()

  useEffect(() => {
    dispatch(
      Web3Actions.setWeb3({
        active,
        activate,
        deactivate,
        account,
        connector,
        library,
        chainId,
        error,
      }),
    )
  }, [
    active,
    activate,
    deactivate,
    account,
    connector,
    library,
    chainId,
    error,
    dispatch,
  ])

  return <></>
}

export const Web3 = () => {
  return <Core />
}

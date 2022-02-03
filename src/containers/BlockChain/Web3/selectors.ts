import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../store/types"

import { initialState } from "./slice"

export const selectWeb3Domain = (state: RootState) => state.web3 || initialState
export const selectWeb3ErrorDomain = (state: RootState) =>
  state.web3?.error || initialState.error
export const selectChainIDDomain = (state: RootState) =>
  state.web3?.chainId || undefined
export const selectAccountDomain = (state: RootState) =>
  state.web3?.account || undefined
export const selectLibraryDomain = (state: RootState) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  state.web3?.library || undefined

export const selectWeb3Error = createSelector(
  [selectWeb3ErrorDomain],
  (error) => error,
)

export const selectChainID = createSelector(
  [selectChainIDDomain],
  (chainId) => chainId,
)

export const selectWeb3 = createSelector(
  [selectWeb3Domain],
  (web3State) => web3State,
)
export const selectAccount = createSelector(
  [selectAccountDomain],
  (account) => account,
)

export const selectIsConnectingToWallet = createSelector(
  [selectWeb3Domain],
  (web3State) => web3State.isConnectingToWallet,
)

export const selectIsActive = createSelector(
  [selectWeb3Domain],
  (web3State) => web3State.active,
)

export const selectConnector = createSelector(
  [selectWeb3Domain],
  (web3State) => web3State.connector,
)

export const selectLibrary = createSelector(
  [selectWeb3Domain],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  (web3State) => web3State.library,
)

export const selectActivate = createSelector(
  [selectWeb3Domain],
  (web3State) => web3State.activate,
)

export const selectDeactivate = createSelector(
  [selectWeb3Domain],
  (web3State) => web3State.deactivate,
)

import { createSelector } from "@reduxjs/toolkit"
import { selectPrivateProviderDomain } from "./Ethers/selectors"
import { selectLibraryDomain } from "./Web3/selectors"
import { initialState } from "./slice"
import { ethers } from "ethers"
import { RootState } from "../../store/types"
import { env } from "../../environment"

export const selectBlockChainDomain = (state: RootState) =>
  state.blockChain || initialState
export const selectMainTokenABIDomain = (state: RootState) =>
  state.blockChain?.mainTokenABI || undefined
export const selectContractsDomain = (state: RootState) =>
  state.blockChain?.contracts || { ...initialState.contracts }
export const selectPricesDomain = (state: RootState) =>
  state.blockChain?.prices || { ...initialState.prices }

export const selectBlockChain = createSelector(
  [selectBlockChainDomain],
  (blockChainState) => blockChainState,
)

export const selectPrices = createSelector(
  [selectPricesDomain],
  (prices) => prices,
)

export const selectMainTokenBalance = createSelector(
  [selectBlockChainDomain],
  (blockChainState) => blockChainState.mainTokenBalance,
)

export const selectIsLoadingSnobBalance = createSelector(
  [selectBlockChainDomain],
  (blockChainState) => blockChainState.isGettingSnobBalance,
)

export const selectContracts = createSelector(
  [selectBlockChainDomain],
  (blockChainState) => blockChainState.contracts,
)

export const selectCalculatedContracts = createSelector(
  [selectPrivateProviderDomain, selectLibraryDomain, selectMainTokenABIDomain],
  (provider, library, mainTokenABI) => {
    if (provider && library && mainTokenABI) {
      return {
        //we checked in index if environment variable exists
        mainTokenContract: new ethers.Contract(
          env.MAIN_TOKEN_ADDRESS || "",
          mainTokenABI,
          provider,
        ),
      }
    }
    return {
      mainTokenContract: undefined,
    }
  },
)

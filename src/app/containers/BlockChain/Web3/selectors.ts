import { createSelector } from '@reduxjs/toolkit';
import { RootState } from "store/types";

import { initialState } from './slice';

export const selectWeb3Domain = (state: RootState) => state.web3 || initialState;
export const selectAccountDomain = (state: RootState) => state.web3?.account || undefined;
export const selectLibraryDomain = (state: RootState) => state.web3?.library || undefined;

export const selectWeb3 = createSelector(
  [selectWeb3Domain],
  web3State => web3State,
);
export const selectAccount = createSelector(
  [selectAccountDomain],
  account => account,
);

export const selectIsConnectingToWallet = createSelector(
  [selectWeb3Domain],
  web3State => web3State.isConnectingToWallet,
);

export const selectIsActive = createSelector(
  [selectWeb3Domain],
  web3State => web3State.active,
);

export const selectConnector = createSelector(
  [selectWeb3Domain],
  web3State => web3State.connector,
);

export const selectLibrary = createSelector(
  [selectWeb3Domain],
  web3State => web3State.library,
);

export const selectActivate = createSelector(
  [selectWeb3Domain],
  web3State => web3State.activate,
);

export const selectDeactivate = createSelector(
  [selectWeb3Domain],
  web3State => web3State.deactivate,
);



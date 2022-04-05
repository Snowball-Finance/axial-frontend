import { PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import { GenericGasResponse } from "app/providers/gasPrice";
import { createSlice } from "store/toolkit";
import {
  NumberInputState,
  slippageCustomStateCreator,
  Slippages,
} from "utils/slippage";
import { TokensToVerifyPayload } from "utils/tokenVerifier";
import { useInjectReducer, useInjectSaga } from "./redux-injectors";
import { globalSaga } from "./saga";
import { LocalStorageKeys, storage } from "./storage";

export interface GlobalState {
  isGettingTokenPrices: boolean;
  tokenPricesUSD: { [K in TokenSymbols]?: number };
  gasPrice: GenericGasResponse | undefined;
  tokens: { [K in TokenSymbols]?: Token } | undefined;
  infiniteApproval: boolean;
  isAdvancedOptionsOpen: boolean;
  tokensInQueueToApprove: { [K in TokenSymbols]?: boolean };
  selectedSlippage: Slippages;
  customSlippage: NumberInputState | undefined;
  transactionSuccessId: string | undefined;
}
// The initial state of the LoginPage container
export const initialState: GlobalState = {
  isGettingTokenPrices: false,
  tokenPricesUSD: {},
  gasPrice: undefined,
  tokens: undefined,
  infiniteApproval: storage.read(LocalStorageKeys.INFINITE_APPROVAL) || false,
  tokensInQueueToApprove: {},
  selectedSlippage:
    storage.read(LocalStorageKeys.SELECTED_SLIPPAGE) || Slippages.OneTenth,
  customSlippage:
    storage.read(LocalStorageKeys.ENTERED_CUSTOM_SLIPPAGE) || undefined,
  isAdvancedOptionsOpen:
    storage.read(LocalStorageKeys.IS_ADVANCED_OPTIONS_OPEN) || false,
  transactionSuccessId: undefined,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<GlobalState["tokens"]>) {
      state.tokens = action.payload;
    },
    getTokenPricesUSD(state, action: PayloadAction<void>) {},
    setTokenPricesUSD(
      state,
      action: PayloadAction<GlobalState["tokenPricesUSD"]>
    ) {
      state.tokenPricesUSD = action.payload;
    },
    setIsGettingTokenPrices(state, action: PayloadAction<boolean>) {
      state.isGettingTokenPrices = action.payload;
    },
    getGasPrice(state, action: PayloadAction<void>) {},
    setGasPrice(state, action: PayloadAction<GlobalState["gasPrice"]>) {
      state.gasPrice = action.payload;
    },
    getTokenBalances(state, action: PayloadAction<void>) {},
    setInfiniteApproval(state, action: PayloadAction<boolean>) {
      state.infiniteApproval = action.payload;
      storage.write(LocalStorageKeys.INFINITE_APPROVAL, action.payload);
    },
    setApprovalForTokenInQueue(
      state,
      action: PayloadAction<{
        tokenSymbol: TokenSymbols;
        approved: boolean;
      }>
    ) {
      const tmp = { ...state.tokensInQueueToApprove };
      tmp[action.payload.tokenSymbol] = action.payload.approved;
      state.tokensInQueueToApprove = tmp;
    },
    emptyTokensInQueueForApproval(state, action: PayloadAction<void>) {
      state.tokensInQueueToApprove = {};
    },
    setSlippage(state, action: PayloadAction<Slippages>) {
      state.customSlippage = undefined;
      state.selectedSlippage = action.payload;
      storage.write(LocalStorageKeys.SELECTED_SLIPPAGE, action.payload);
    },
    setISAdvancedOptionsOpen(state, action: PayloadAction<boolean>) {
      state.isAdvancedOptionsOpen = action.payload;
      storage.write(LocalStorageKeys.IS_ADVANCED_OPTIONS_OPEN, action.payload);
    },
    setCustomSlippage(state, action: PayloadAction<string>) {
      state.selectedSlippage = Slippages.Custom;
      const newValue = slippageCustomStateCreator(action.payload);
      state.customSlippage = newValue;
      storage.write(LocalStorageKeys.ENTERED_CUSTOM_SLIPPAGE, newValue);
      storage.write(LocalStorageKeys.SELECTED_SLIPPAGE, Slippages.Custom);
    },
    setTransactionSuccessId(state, action: PayloadAction<string | undefined>) {
      state.transactionSuccessId = action.payload;
    },
    checkIfListOfTokensAreApproved(
      state,
      action: PayloadAction<TokensToVerifyPayload>
    ) {},
    approveListOfTokens(state, action: PayloadAction<TokensToVerifyPayload>) {},
  },
});

export const {
  actions: GlobalActions,
  reducer: globalReducer,
  name: sliceKey,
} = globalSlice;
export const useGlobalSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: globalReducer });
  useInjectSaga({ key: sliceKey, saga: globalSaga });
  return { GlobalActions };
};

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/toolkit';
import { ContainerState } from './types';
import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { blockChainSaga } from './saga';
import { Contract } from "app/types";
import { BigNumber } from "@ethersproject/bignumber";

// The initial state of the BlockChain container
export const initialState: ContainerState = {
  snowConeBalance: undefined,
  snowballBalance: undefined,
  totalSnowConeSupply: BigNumber.from(0),
  isGettingSnobBalance: false,
  isGettingSnowConeBalance: false,
  totalSnowConeValue: '',
  prices: {
    SNOB: 0,
    SNOB24HChange: 0,
  },
  contracts: {
    snob: undefined,
    snowCone: undefined,
    gaugeProxy: undefined,
  }
};

const blockChainSlice = createSlice({
  name: 'blockChain',
  initialState,
  reducers: {
    getBalance(state, action: PayloadAction<Contract>) {
    },
    getSnobBalance(state, action: PayloadAction<void>) { },
    setContracts(state, action: PayloadAction<any>) {
      state.contracts = action.payload;
    },
    getSnowConeBalance(state, action: PayloadAction<void>) { },
    setIsGettingSnobBalance(state, action: PayloadAction<boolean>) {
      state.isGettingSnobBalance = action.payload;
    },
    setIsGettingSnowConeBalance(state, action: PayloadAction<boolean>) {
      state.isGettingSnowConeBalance = action.payload;
    },
    setSnobBalance(state, action: PayloadAction<BigNumber>) {
      state.snowballBalance = action.payload;
    },
    setSnowConeBalance(state, action: PayloadAction<BigNumber>) {
      state.snowConeBalance = action.payload;
    },
    getPrices(state, action: PayloadAction<void>) { },
    getTotalSnowConeSupply(state, action: PayloadAction<void>) { },
    setTotalSnowConeSupply(state, action: PayloadAction<BigNumber>) {
      state.totalSnowConeSupply = action.payload;
    },
    setPrices(state, action: PayloadAction<ContainerState['prices']>) {
      state.prices = action.payload;
    }
  },
});

export const { actions: BlockChainActions, reducer: BlockChainReducer, name: sliceKey } = blockChainSlice;

export const useBlockChainSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: BlockChainReducer });
  useInjectSaga({ key: sliceKey, saga: blockChainSaga });
  return { BlockChainActions }
}
/**
 *
 * HomePage
 *
 */

import React from "react";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { HomePageReducer, sliceKey } from "./slice";
import { homePageSaga } from "./saga";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { useDispatch, useSelector } from "react-redux";
import { SwapActions } from "app/containers/Swap/slice";
import { BigNumber } from "ethers";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { TokenSymbols } from "app/containers/Swap/types";

export const HomePage = () => {
  useInjectReducer({ key: sliceKey, reducer: HomePageReducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  const dispatch = useDispatch();
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );
  const isSwapping = useSelector(SwapSelectors.selectIsSwapping);
  const bestPath = useSelector(SwapSelectors.selectBestPath);

  const handleGetBestSwapPathClick = () => {
    dispatch(
      SwapActions.findBestPath({
        fromTokenSymbol: TokenSymbols.USDTe,
        amountToGive: BigNumber.from(1),
        toTokenSymbol: TokenSymbols.FRAX,
      })
    );
  };
  const handleSwapClick = () => {
    dispatch(SwapActions.swap());
  };

  return (
    <>
      <ContainedButton
        loading={isGettingBestSwapPath}
        onClick={handleGetBestSwapPathClick}
      >
        test getOptimal Path
      </ContainedButton>
      {bestPath && (
        <ContainedButton loading={isSwapping} onClick={handleSwapClick}>
          test swap
        </ContainedButton>
      )}
    </>
  );
};

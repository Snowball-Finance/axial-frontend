import React, { FC, useEffect } from "react";
import { Grid, styled } from "@mui/material";

import { AddLiquidity } from "./components/AddLiquidity";
import { CurrencyInfo } from "../../components/CurrencyInfo";
import { useParams } from "react-router-dom";
import { pools } from "app/pools";
import { useDispatch, useSelector } from "react-redux";
import { LiquidityPageActions } from "../../slice";
import { Pool } from "app/containers/Rewards/types";
import { LiquidityPageSelectors } from "../../selectors";
import { DepositConfirmationModal } from "./components/depositConfirmationModal";
import { mobile } from "styles/media";

type TParams = { poolIndex: string };

export const Deposit: FC = () => {
  const dispatch = useDispatch();
  const { poolIndex } = useParams<TParams>();
  const poolKey = poolIndex?.toUpperCase() || "";
  const pool = useSelector(LiquidityPageSelectors.selectedPool);

  useEffect(() => {
    if (poolKey) {
      const pool = pools[poolKey] as Pool;
      dispatch(LiquidityPageActions.setSelectedPool(pool));
    }
  }, [poolKey]);
  return (
    <>
      <DepositConfirmationModal />
      <PageWrapper>
        <Grid container spacing={4}>
          <Grid item>{pool && <AddLiquidity />}</Grid>
          <Grid item>
            <CurrencyInfo />
          </Grid>
        </Grid>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled("div")({
  width: 650,
  margin: "0 auto",

  [mobile]: {
    width: "100%",
  },
});

import React, { FC, useEffect } from "react";
import { Grid, styled } from "@mui/material";

import { AddLiquidity } from "./components/AddLiquidity";
import { CurrencyReserve } from "../../components/CurrencyReserve";
import { useParams } from "react-router-dom";
import { getKeyFromPoolIndex } from "../../constants";
import { pools } from "app/pools";
import { useDispatch, useSelector } from "react-redux";
import { LiquidityPageActions } from "../../slice";
import { Pool } from "app/containers/Rewards/types";
import { LiquidityPageSelectors } from "../../selectors";

type TParams = { poolIndex: string };

export const Deposit: FC = () => {
  const dispatch = useDispatch();
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const pool = useSelector(LiquidityPageSelectors.selectedPool);

  useEffect(() => {
    if (poolKey) {
      const pool = pools[poolKey] as Pool;
      dispatch(LiquidityPageActions.setSelectedPool(pool));
    }
  }, [poolKey]);
  return (
    <PageWrapper>
      <Grid container spacing={4}>
        <Grid item>{pool && <AddLiquidity />}</Grid>
        <Grid item>
          <CurrencyReserve />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

const PageWrapper = styled("div")({
  width: 650,
  margin: "0 auto",
});

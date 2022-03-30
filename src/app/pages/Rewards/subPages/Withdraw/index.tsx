import React, { FC, useEffect } from "react";
import { Grid, styled } from "@mui/material";

import { CurrencyReserve } from "../../components/CurrencyReserve";
import { WithdrawInput } from "./components/Input";
import { mobile } from "styles/media";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getKeyFromPoolIndex } from "app/pages/Liquidity/constants";
import { pools } from "app/pools";
import { Pool } from "app/containers/Rewards/types";
import { RewardsPageActions } from "../../slice";

type TParams = { poolIndex: string };

export const Withdraw: FC = () => {
  const dispatch = useDispatch();
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";

  useEffect(() => {
    if (poolKey) {
      const pool = pools[poolKey] as Pool;
      dispatch(RewardsPageActions.setSelectedPool(pool));
    }
  }, [poolKey]);

  return (
    <PageWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <WithdrawInput />
        </Grid>
        <Grid item xs={12}>
          <CurrencyReserve />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

const PageWrapper = styled("div")({
  width: 650,
  margin: "0 auto",

  [mobile]: {
    width: "100%",
  },
});

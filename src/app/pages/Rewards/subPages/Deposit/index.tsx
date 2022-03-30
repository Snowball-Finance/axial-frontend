import React, { FC, useEffect } from "react";
import { Grid, styled } from "@mui/material";

import { DepositWrapped } from "./components/DepositWrapped";
import { CurrencyReserve } from "../../components/CurrencyReserve";
import { mobile } from "styles/media";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getKeyFromPoolIndex } from "../../constants";
import { pools } from "app/pools";
import { Pool } from "app/containers/Rewards/types";
import { RewardsPageActions } from "../../slice";

type TParams = { poolIndex: string };

export const Deposit: FC = () => {
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
        <Grid item>
          <DepositWrapped />
        </Grid>
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

  [mobile]: {
    width: "100%",
  },
});

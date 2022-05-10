import React, { FC, useEffect } from "react";
import { Grid, styled } from "@mui/material";

import { DepositWrapped } from "./components/DepositWrapped";
import { CurrencyInfo } from "../../components/Currencyinfo";
import { mobile } from "styles/media";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { pools } from "app/pools";
import { Pool } from "app/containers/Rewards/types";
import { RewardsPageActions } from "../../slice";
import { DepositConfirmationModal } from "./components/DepositWrapped/depositConfirmationModal";
import { getKeyFromPoolIndex } from "app/pages/Liquidity/constants";

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
    <>
      <DepositConfirmationModal />
      <PageWrapper>
        <Grid container spacing={4}>
          <Grid item>
            <DepositWrapped />
          </Grid>
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

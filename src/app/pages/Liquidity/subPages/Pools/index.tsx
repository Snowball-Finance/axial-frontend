import React, { FC } from "react";
import { Grid, styled } from "@mui/material";
import { useSelector } from "react-redux";

import { Max1040 } from "app/components/wrappers/max1040";
import { PoolCardItem } from "./components/PoolCardItem";
import { LiquidityPageSelectors } from "../../selectors";

export const PoolCards: FC = () => {
  const liquidityPools = useSelector(LiquidityPageSelectors.liquidityPools);

  return (
    <StyledPoolCards>
      <Grid container spacing={2}>
        {liquidityPools.map((pool) => (
          <Grid item key={pool.key} xs={12}>
            <PoolCardItem poolKey={pool.key}/>
          </Grid>
        ))}
      </Grid>
    </StyledPoolCards>
  );
};

const StyledPoolCards = styled(Max1040)({
  margin: "0px auto",
});

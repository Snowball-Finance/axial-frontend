import React, { FC } from "react";
import { Grid, styled } from "@mui/material";
import { useSelector } from "react-redux";

import { Max1040 } from "app/components/wrappers/max1040";
import { PoolCardItem } from "./components/PoolCardItem";
import { RewardsPageSelectors } from "../../selectors";

export const PoolCards: FC = () => {
  const rewardsPools = useSelector(RewardsPageSelectors.rewardsPools);

  return (
    <>
      <StyledPoolCards>
        <Grid container spacing={2}>
          {rewardsPools.map((pool) => (
            <Grid item key={pool.key} xs={12}>
              <PoolCardItem poolKey={pool.key} />
            </Grid>
          ))}
        </Grid>
      </StyledPoolCards>
    </>
  );
};

const StyledPoolCards = styled(Max1040)({
  margin: "0px auto",
});

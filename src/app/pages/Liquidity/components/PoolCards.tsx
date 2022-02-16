import React, { FC } from "react";
import { Grid, styled } from "@mui/material";

import { Max1040 } from "app/components/wrappers/max1040";
import { PoolCardItem } from "./PoolCardItem";

export const PoolCards: FC = () => {
  return (
    <StyledPoolCards>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item key={item} xs={12}>
            <PoolCardItem />
          </Grid>
        ))}
      </Grid>
    </StyledPoolCards>
  );
};

const StyledPoolCards = styled(Max1040)({
  margin: "0px auto",
});

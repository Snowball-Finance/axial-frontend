import React, { FC } from "react";
import { styled, Grid } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { Header } from "./components/Header";
import { Max } from "./components/Max";
import { Input } from "./components/Input";
import { FromTokenSearch } from "./components/FromTokenSearch";
import { Balance } from "./components/Balance";

export const FromToken: FC = () => {
  return (
    <StyledContainerItem item xs={12}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Header />

            <Max />
          </Grid>
        </Grid>

        <Grid item>
          <StyledCurrencyInput>
            <Grid container justifyContent="space-between" alignItems="center">
              <Input />

              <FromTokenSearch />
            </Grid>
          </StyledCurrencyInput>
        </Grid>

        <Balance />
      </Grid>
    </StyledContainerItem>
  );
};

const StyledContainerItem = styled(Grid)({
  width: "100%",
});

const StyledCurrencyInput = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 10,
});

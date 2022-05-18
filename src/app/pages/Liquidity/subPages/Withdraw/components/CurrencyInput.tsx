import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { getKeyFromPoolIndex } from "app/pages/Liquidity/constants";
import { Token } from "app/containers/Swap/types";
import { WithdrawInput } from "./input";
import { EquivalentWithdrawAmount } from "./equivalentWithdrawAmount";
import { mobile } from "styles/media";

type TParams = { poolIndex: string };

export const CurrencyInput: FC = () => {
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const poolTokens = useSelector(
    LiquidityPageSelectors.liquidityPoolTokens(poolKey)
  );

  return poolTokens?.map((token: Token) => (
    <Grid item key={token.address}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <StyledCurrencyInput
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <TokenIconContainer item>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="flex-start"
              >
                <Grid item>
                  <IconImage src={token.logo} alt="icon"></IconImage>
                </Grid>

                <Grid item>
                  <TokenText variant="h6">{token.symbol}</TokenText>
                </Grid>
              </Grid>
            </TokenIconContainer>

            <Grid item xs={5} xl={6}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12}>
                  <WithdrawInput token={token} />
                </Grid>

                <Grid item xs={12}>
                  <EquivalentWithdrawAmount token={token} />
                </Grid>
              </Grid>
            </Grid>
          </StyledCurrencyInput>
        </Grid>
      </Grid>
    </Grid>
  ));
};

const StyledCurrencyInput = styled(Grid)({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "12px 36px",

  [mobile]: {
    padding: 15,
  },
});

const TokenIconContainer = styled(Grid)({
  border: `2px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 10,
});

const IconImage = styled("img")({
  width: "32px",
  height: "32px",
});

const TokenText = styled(Typography)({
  color: CssVariables.white,
});

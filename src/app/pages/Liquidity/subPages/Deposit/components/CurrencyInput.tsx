import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowInput } from "app/components/base/SnowInput";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { getKeyFromPoolIndex } from "app/pages/Liquidity/constants";
import { Token } from "app/containers/Swap/types";
import { BNToString } from "common/format";
import { Zero } from "app/containers/Rewards/constants";
import { globalSelectors } from "app/appSelectors";

type TParams = { poolIndex: string };

export const CurrencyInput: FC = () => {
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const poolTokens = useSelector(
    LiquidityPageSelectors.liquidityPoolTokens(poolKey)
  );
  const tokens = useSelector(globalSelectors.tokens);

  return poolTokens?.map((pool: Token) => (
    <Grid item key={pool.address}>
      <Grid container direction="column" spacing={1}>
        <Grid item alignSelf="end">
          <BalanceText variant="body2">
            Wallet balance:{" "}
            {tokens &&
              BNToString(
                tokens[pool.symbol].balance ?? Zero,
                tokens[pool.symbol].decimals
              )}
          </BalanceText>
        </Grid>

        <Grid item>
          <StyledCurrencyInput
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <IconImage src={pool.logo} alt="icon"></IconImage>
                </Grid>

                <Grid item>
                  <TokenText variant="h6">{pool.symbol}</TokenText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <CurrencyInputField value="0.00" onChange={() => {}} />
                </Grid>

                <Grid item>
                  <InputText variant="body2">=$0.0</InputText>
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
  padding: "5px 20px",
});

const IconImage = styled("img")({
  width: "33px",
});

const TokenText = styled(Typography)({
  color: CssVariables.white,
});

const InputText = styled(Typography)({
  color: CssVariables.white,
});

const CurrencyInputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    width: 80,
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});

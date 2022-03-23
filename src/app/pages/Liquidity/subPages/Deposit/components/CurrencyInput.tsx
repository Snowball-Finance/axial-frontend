import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import { globalSelectors } from "app/appSelectors";
import { LiquidityDepositInput } from "./input";
import { Pool } from "app/containers/Rewards/types";
import { WalletBalance } from "./walletBalance";

export const CurrencyInputs: FC = () => {
  const tokens = useSelector(globalSelectors.tokens)as Token[];
  const pool = useSelector(LiquidityPageSelectors.selectedPool) as Pool;
  const poolTokens = pool.underlyingPoolTokens || pool.poolTokens;

  return (
    <>
      {poolTokens?.map((token: Token) => (
        <Grid item key={token.address}>
          <Grid container direction="column" spacing={1}>
            <Grid item alignSelf="end">
           <WalletBalance token={tokens[token.symbol]} />
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
                      <IconImage src={token.logo} alt="icon"></IconImage>
                    </Grid>

                    <Grid item>
                      <TokenText variant="h6">{token.symbol}</TokenText>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <LiquidityDepositInput
                        tokenSymbol={token.symbol as TokenSymbols}
                      />
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
      ))}
    </>
  );
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


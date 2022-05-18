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
import { EquivalentTokenPriceUSD } from "app/pages/Liquidity/subPages/Deposit/components/EquivalentTokenPriceUSD";
import { Max } from "./Max";
import { InsufficientBalance } from "./InsufficientBalance";
import { mobile } from "styles/media";

export const CurrencyInputs: FC = () => {
  const tokens = useSelector(globalSelectors.tokens) as Token[];
  const pool = useSelector(LiquidityPageSelectors.selectedPool) as Pool;
  const depositRaw = useSelector(LiquidityPageSelectors.depositRaw);
  const poolTokens = depositRaw
    ? pool.poolTokens
    : pool.underlyingPoolTokens || pool.poolTokens;
  return (
    <>
      {poolTokens?.map((token: Token) => (
        <Grid item key={token.address}>
          <Grid container direction="column" spacing={1}>
            <Grid item alignSelf="end">
              <Max token={tokens[token.symbol]} />
            </Grid>

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

                    <Grid item alignSelf="center">
                      <TokenText variant="h2">{token.symbol}</TokenText>
                    </Grid>
                  </Grid>
                </TokenIconContainer>

                <Grid item xs={5} xl={6}>
                  <Grid container>
                    <Grid item xs={12}>
                      <LiquidityDepositInput
                        tokenSymbol={token.symbol as TokenSymbols}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <EquivalentTokenPriceUSD token={token} />
                    </Grid>
                  </Grid>
                </Grid>
              </StyledCurrencyInput>
            </Grid>

            <Grid item alignSelf="end">
              <WalletBalance token={tokens[token.symbol]} />
            </Grid>

            <Grid item alignSelf="end">
              <InsufficientBalance token={tokens[token.symbol]} />
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

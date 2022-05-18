import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CurrencyInput } from "./CurrencyInput";
import { AdvanceOption } from "app/components/common/advancedOptions";
import { useSelector } from "react-redux";
import { DepositButton } from "./depositButton";
import { WalletBalance } from "./walletBalance";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { CompoundWithSnowball } from "./CompoundWithSnowball";
import { mobile } from "styles/media";
import { Max } from "./Max";
import { globalSelectors } from "app/appSelectors";

export const DepositWrapped: FC = () => {
  const { t } = useTranslation();

  const pool = useSelector(RewardsPageSelectors.selectedPool);
  const tokens = useSelector(globalSelectors.tokens);

  return (
    <StyledAddLiquidity>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h2">
            {t(translations.RewardsPage.Deposit.Title())}
          </HeaderText>
        </Grid>

        <Grid item alignSelf="end">
          {pool && tokens && <Max token={tokens[pool?.lpToken.symbol]} />}
        </Grid>

        <Grid item>
          <CurrencyInput />
        </Grid>

        <Grid item alignSelf="end">
          {pool && tokens && (
            <WalletBalance token={tokens[pool?.lpToken.symbol]} />
          )}
        </Grid>

        <Grid item>
          <AdvanceOption />
        </Grid>

        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DepositButton />
            </Grid>

            <Grid item xs={12}>
              <OrText variant="body2" align="center">
                {t(translations.RewardsPage.Deposit.Or())}
              </OrText>
            </Grid>

            <Grid item xs={12}>
              <CompoundWithSnowball />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledAddLiquidity>
  );
};

const StyledAddLiquidity = styled("div")({
  width: 600,
  margin: "0 auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "40px",

  [mobile]: {
    width: "100%",
    padding: "20px",
  },
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const OrText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});

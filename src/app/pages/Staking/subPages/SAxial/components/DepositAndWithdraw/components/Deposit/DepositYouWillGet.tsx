import { Grid, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { env } from "environment";
import { Description } from "app/pages/Staking/components/Description";

export const DepositYouWillGet = () => {
  const { t } = useTranslation();
  const governanceTokenName = env.GOVERNANCE_TOKEN_NAME;
  const youWillGet = useSelector(StakingPageSelectors.selectYouWillGet);
  const enteredAmount = useSelector(
    StakingPageSelectors.selectEnteredMainTokenToStake
  );

  if (enteredAmount === "" || isNaN(Number(enteredAmount))) {
    return null;
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Text variant="h2">
          {t(translations.Staking.YouWillGet_AMOUNT_TOKEN(), {
            token: governanceTokenName,
            amount: Number(youWillGet).toFixed(4),
          })}
        </Text>
      </Grid>

      <Grid item>
        <Description />
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

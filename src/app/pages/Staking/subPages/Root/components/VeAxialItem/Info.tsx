import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { BNToFractionString } from "common/format";

export const VeAxialInfo: FC = () => {
  const { t } = useTranslation();
  const rawVeAxialBalance = useSelector(
    GovernanceSelectors.accruingTokenBalance
  );
  const rawAxialStakedIntoVeAxial = useSelector(
    GovernanceSelectors.mainTokenAmountStakedForAccruing
  );
  const veAxialBalance = BNToFractionString(rawVeAxialBalance);
  const stakedAxialIntoVeAxial = BNToFractionString(rawAxialStakedIntoVeAxial);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Text variant="body1">{t(translations.Staking.Info.veAXIAL())}</Text>
        <Text variant="body2">{veAxialBalance || "0.000"}</Text>
      </Grid>

      <Grid item>
        <Text variant="body1">
          {t(translations.Staking.Info.AXIALStaked())}
        </Text>
        <Text variant="body2">{stakedAxialIntoVeAxial || "0.000"}</Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

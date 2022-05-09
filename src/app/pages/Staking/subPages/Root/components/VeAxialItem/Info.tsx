import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { BNToFractionString } from "common/format";
import { mobile } from "styles/media";

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
    <StyledContainer container spacing={2}>
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
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  [mobile]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

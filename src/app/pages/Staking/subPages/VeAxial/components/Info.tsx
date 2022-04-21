import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { BNToFractionString } from "common/format";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";

export const Info: FC = () => {
  const { t } = useTranslation();
  const rawBalance = useSelector(GovernanceSelectors.accruingTokenBalance);
  const rawStaked = useSelector(
    GovernanceSelectors.mainTokenAmountStakedForAccruing
  );
  const balance = BNToFractionString(rawBalance);
  const staked = BNToFractionString(rawStaked);

  return (
    <StyledPoolCard>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Title variant="h5">
            {t(translations.Staking.Info.AXIALStaked())}
          </Title>
          <Text variant="body2">{staked?.toString() || "0"}</Text>
        </Grid>

        <Grid item>
          <Text variant="h5">
            {t(translations.Staking.Info.veAXIALearned())}
          </Text>
          <Text variant="body2">{balance?.toString() || "0"}</Text>
        </Grid>
      </Grid>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "26px 36px",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const Title = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

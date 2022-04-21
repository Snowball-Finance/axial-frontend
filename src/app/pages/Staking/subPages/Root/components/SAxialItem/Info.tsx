import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { BNToFractionString } from "common/format";
import { StakingPageSelectors } from "app/pages/Staking/selectors";

export const SAxialInfo: FC = () => {
  const { t } = useTranslation();
  const lockedGovernanceTokenInfo = useSelector(
    StakingSelectors.lockedGovernanceTokenInfo
  );
  const rawLockedTokenAmount = lockedGovernanceTokenInfo?.startingAmountLocked;
  const rawClaimableAxial = useSelector(
    StakingSelectors.claimableGovernanceToken
  );
  const lockEndDate = useSelector(StakingPageSelectors.lockEndDate);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Text variant="body1">{t(translations.Staking.Info.sAXIAL())}</Text>
        <Text variant="body2">
          {BNToFractionString(rawLockedTokenAmount) || "0"}
        </Text>
      </Grid>

      <Grid item>
        <Text variant="body1">
          {t(translations.Staking.Info.AXIALUnlocked())}
        </Text>
        <Text variant="body2">
          {BNToFractionString(rawClaimableAxial) || "0"}
        </Text>
      </Grid>

      <Grid item>
        <Text variant="body1">{t(translations.Staking.Info.LockEnd())}</Text>
        <Text variant="body2">{lockEndDate || "-"}</Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

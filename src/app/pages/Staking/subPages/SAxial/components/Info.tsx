import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { BNToFractionString } from "common/format";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { commify } from "app/containers/utils/contractUtils";
import { zeroString } from "app/pages/Liquidity/constants";
import { mobile } from "styles/media";

export const Info: FC = () => {
  const { t } = useTranslation();
  const lockedGovernanceTokenInfo = useSelector(
    StakingSelectors.lockedGovernanceTokenInfo
  );
  const rawLockedTokenAmount = lockedGovernanceTokenInfo?.startingAmountLocked;
  const rawClaimableAxial = useSelector(
    StakingSelectors.claimableGovernanceToken
  );
  const lockEndDate = useSelector(StakingPageSelectors.lockEndDate);
  const sAxialDataFromAPI = useSelector(
    StakingSelectors.selectSAxialDataFromAPI
  );

  return (
    <StyledPoolCard>
      <StyledContainer container spacing={2}>
        <Grid item xl={4} xs={12}>
          <Text variant="h5">{t(translations.Staking.Info.sAXIAL())}</Text>
          <Text variant="body2">
            {commify(BNToFractionString(rawLockedTokenAmount) || "0")}
          </Text>
        </Grid>

        <Grid item xl={4} xs={12}>
          <Title variant="h5">
            {t(translations.Staking.Info.AXIALUnlocked())}
          </Title>
          <Text variant="body2">
            {commify(BNToFractionString(rawClaimableAxial) || "0")}
          </Text>
        </Grid>

        <Grid item xl={4} xs={12}>
          <Title variant="h5">{t(translations.Staking.Info.LockEnd())}</Title>
          <Text variant="body2">{lockEndDate || "-"}</Text>
        </Grid>

        <Grid item xl={4} xs={12}>
          <Title variant="h5">
            {t(translations.Staking.Info.TotalStaked())}
          </Title>
          <Text variant="body2">
            {commify(sAxialDataFromAPI?.totalStaked ?? zeroString) || "-"}
          </Text>
        </Grid>

        <Grid item xl={4} xs={12}>
          <Title variant="h5">
            {t(translations.Staking.Info.WalletStaked())}
          </Title>
          <Text variant="body2">{sAxialDataFromAPI?.walletStaked || "-"}</Text>
        </Grid>

        <Grid item xl={4} xs={12}>
          <Title variant="h5">
            {t(translations.Staking.Info.AverageStaked())}
          </Title>
          <Text variant="body2">
            {commify(
              sAxialDataFromAPI?.averageStaked.toString() ?? zeroString
            ) || "-"}
          </Text>
        </Grid>
      </StyledContainer>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "26px 36px",

  [mobile]: {
    padding: "15px 15px",
  },
});

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

const Title = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

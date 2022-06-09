import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { env } from "environment";
import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { commify } from "app/containers/utils/contractUtils";

export const VotingPowerInfo: FC = () => {
  const { t } = useTranslation();

  const governanceTokenBalance = useSelector(
    GovernanceSelectors.floatedGovernanceTokenBalance
  );
  const account = useSelector(Web3Selectors.selectAccount);

  const balance =
    governanceTokenBalance && account
      ? commify(governanceTokenBalance.toString())
      : "0.000";

  return (
    <PrimaryCardWrapper>
      <Grid container spacing={2}>
        <Grid item>
          <Logo src={env.GOVERNANCE_TOKEN_LOGO_ADDRESS} alt="logo" />
        </Grid>

        <Grid item>
          <Title variant="h2">
            {t(translations.GovernancePage.VotingPower())}
          </Title>

          <Text variant="body2">
            {balance} {env.GOVERNANCE_TOKEN_NAME}
          </Text>
        </Grid>
      </Grid>
    </PrimaryCardWrapper>
  );
};

const Logo = styled("img")({
  width: "48px",
  height: "48px",
});

const Title = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

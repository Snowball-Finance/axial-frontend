import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { BigNumber } from "ethers";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { BNToFloat } from "common/format";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Actions } from "./Actions";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { env } from "environment";
import { WithdrawConfirmationModal } from "./WithdrawConfirmationModal";
import { WithdrawWarning } from "./WithdrawWarning";

export const Withdraw: FC = () => {
  const { t } = useTranslation();

  const tokenName = env.ACCRUING_TOKEN_NAME;
  const rawTokenBalance = useSelector(GovernanceSelectors.accruingTokenBalance);
  const tokenBalance = BNToFloat(
    rawTokenBalance ?? BigNumber.from(0),
    18
  )?.toFixed(3);

  return (
    <>
      <WithdrawConfirmationModal />
      <Grid container spacing={4} alignItems="center">
        {tokenBalance && +tokenBalance > 0 ? (
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              <Grid item>
                <Text variant="h2">
                  {tokenBalance} {tokenName}
                </Text>
              </Grid>

              <Grid item>
                <CapitalText variant="h2">
                  {t(translations.Staking.AvailableToWithdraw())}
                </CapitalText>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <CapitalText variant="h2" align="center">
              {t(translations.Staking.NothingToWithdraw())}
            </CapitalText>
          </Grid>
        )}

        <Grid item xs={12}>
          <WithdrawWarning />
        </Grid>

        <Grid item xs={12}>
          <Actions />
        </Grid>
      </Grid>
    </>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const CapitalText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

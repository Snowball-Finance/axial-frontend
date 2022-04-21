import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { BigNumber } from "ethers";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { BNToFloat } from "common/format";
import { Description } from "app/pages/Staking/components/Description";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Actions } from "./Actions";
import { WithdrawConfirmationModal } from "./WithdrawConfirmationModal";

export const Withdraw: FC = () => {
  const { t } = useTranslation();

  const rawClaimableAxial = useSelector(
    StakingSelectors.claimableGovernanceToken
  );
  const unlockedAxialAmount = BNToFloat(
    rawClaimableAxial ?? BigNumber.from(0),
    18
  )?.toFixed(3);

  return (
    <>
      <WithdrawConfirmationModal />
      <Grid container spacing={4} alignItems="center">
        {unlockedAxialAmount && +unlockedAxialAmount > 0 ? (
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              <Grid item>
                <Text variant="h2">{unlockedAxialAmount} Axial</Text>
              </Grid>

              <Grid item>
                <Text variant="h2">
                  {t(translations.Staking.AvailableToWithdraw())}
                </Text>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Text variant="h2" align="center">
              {t(translations.Staking.NothingToWithdraw())}
            </Text>
          </Grid>
        )}

        <Grid item xs={12}>
          <Description />
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
  textTransform: "uppercase",
});

import { FC } from "react";
import { Grid } from "@mui/material";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { StakingSubPages } from "app/pages/Staking/routes";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { BNToFractionString } from "common/format";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";

export const Actions: FC = () => {
  const { t } = useTranslation();
  const rawClaimableAxial = useSelector(
    StakingSelectors.claimableGovernanceToken
  );
  const isWithdrawingGovernanceToken = useSelector(
    StakingSelectors.selectIsWithdrawing
  );

  const dispatch = useDispatch();

  const withdrawSAxial = () => {
    dispatch(StakingActions.withdrawGovernanceToken());
  };

  const goToSAxial = () => {
    dispatch(push(StakingSubPages.sAxial));
  };

  const unlockedAxialAmount = BNToFractionString(rawClaimableAxial);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <ContainedButton onClick={goToSAxial}>
          {t(translations.Staking.Lock())}
        </ContainedButton>
      </Grid>

      {Number(unlockedAxialAmount || 0) > 0 && (
        <Grid item>
          <OutlinedButton
            onClick={withdrawSAxial}
            loading={isWithdrawingGovernanceToken}
          >
            {t(translations.Staking.Withdraw())}
          </OutlinedButton>
        </Grid>
      )}
    </Grid>
  );
};

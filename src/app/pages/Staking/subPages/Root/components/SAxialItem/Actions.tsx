import { FC } from "react";
import { Grid, styled } from "@mui/material";
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
import { mobile } from "styles/media";

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
    <StyledContainer container spacing={2}>
      <Grid item>
        <StyledContainedButton onClick={goToSAxial}>
          {t(translations.Staking.Lock())}
        </StyledContainedButton>
      </Grid>

      {Number(unlockedAxialAmount || 0) > 0 && (
        <Grid item>
          <StyledOutlinedButton
            onClick={withdrawSAxial}
            loading={isWithdrawingGovernanceToken}
          >
            {t(translations.Staking.Withdraw())}
          </StyledOutlinedButton>
        </Grid>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  flexDirection: "row",

  [mobile]: {
    flexDirection: "column",
  },
});

const StyledContainedButton = styled(ContainedButton)({
  [mobile]: {
    width: "100%",
  },
});

const StyledOutlinedButton = styled(OutlinedButton)({
  [mobile]: {
    width: "100%",
  },
});

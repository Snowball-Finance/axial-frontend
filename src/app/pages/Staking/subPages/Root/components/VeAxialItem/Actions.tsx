import { FC } from "react";
import { Grid, styled } from "@mui/material";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { StakingSubPages } from "app/pages/Staking/routes";
import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { BNToFractionString } from "common/format";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { mobile } from "styles/media";

export const Actions: FC = () => {
  const { t } = useTranslation();
  const isWithdrawingAccruingToken = useSelector(
    StakingSelectors.isWithdrawingAccruingToken
  );
  const rawVeAxialBalance = useSelector(
    GovernanceSelectors.accruingTokenBalance
  );

  const dispatch = useDispatch();

  const withdrawVeAxial = () => {
    dispatch(StakingActions.withdrawAccruingToken());
  };

  const goToVeAxial = () => {
    dispatch(push(StakingSubPages.veAxial));
  };

  const veAxialBalance = BNToFractionString(rawVeAxialBalance);

  return (
    <StyledContainer container spacing={2}>
      <Grid item>
        <StyledContainedButton onClick={goToVeAxial}>
          {t(translations.Staking.Stake())}
        </StyledContainedButton>
      </Grid>

      {Number(veAxialBalance || 0) > 0 && (
        <Grid item>
          <StyledOutlinedButton
            onClick={withdrawVeAxial}
            loading={isWithdrawingAccruingToken}
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

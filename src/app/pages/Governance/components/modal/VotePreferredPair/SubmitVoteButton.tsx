import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { env } from "environment";
import { styled } from "@mui/material";
import { mobile } from "styles/media";

export const SubmitVoteButton: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const votingTokenBalance = useSelector(
    GovernanceSelectors.governanceTokenBalance
  );
  const isLoading = useSelector(GovernancePageSelectors.isVotingForFarms);

  let buttonContent = t(
    translations.GovernancePage.VoteAllocation.TOKEN_BalanceNeededToVote(),
    { token: env.GOVERNANCE_TOKEN_NAME }
  );
  let disabled = true;

  if (votingTokenBalance && Number(votingTokenBalance.toString()) > 0) {
    disabled = false;
    buttonContent = t(
      translations.GovernancePage.VoteAllocation.VoteAllocation()
    );
  }

  const handleVoteClick = () => {
    dispatch(GovernancePageActions.voteForFarms());
  };

  return (
    <StyledContained
      fullWidth
      loading={isLoading}
      disabled={disabled}
      onClick={handleVoteClick}
    >
      {buttonContent}
    </StyledContained>
  );
};

const StyledContained = styled(ContainedButton)({
  maxWidth: `calc(100vw - 65px)`,
  [mobile]: {
    padding: "0",
  },
});

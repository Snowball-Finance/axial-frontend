import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const VoteAllocationSubmit = () => {
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
    <ContainedButton
      height={36}
      fullWidth
      loading={isLoading}
      disabled={disabled}
      onClick={handleVoteClick}
    >
      {buttonContent}
    </ContainedButton>
  );
};

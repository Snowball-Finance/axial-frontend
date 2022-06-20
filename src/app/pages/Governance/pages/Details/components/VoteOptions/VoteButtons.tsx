import { FC } from "react";
import { Grid, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { ProposalState } from "app/containers/BlockChain/Governance/types";

export const VoteButtons: FC = () => {
  const { t } = useTranslation();

  const library = useSelector(Web3Selectors.selectLibrary);
  const isLoadingFor = useSelector(GovernanceSelectors.isVotingFor);
  const receipt = useSelector(GovernanceSelectors.receipt);
  const isGettingReceipt = useSelector(GovernanceSelectors.isLoadingReceipt);
  const proposal = useSelector(GovernancePageSelectors.selectedProposal);

  const dispatch = useDispatch();

  const isActive = proposal?.proposal_state === ProposalState.Active;
  const disabled = receipt?.hasVoted || isGettingReceipt || false || !isActive;

  const handleForClick = () => {
    if (library && proposal) {
      dispatch(GovernancePageActions.setIsModalOpen(true));
      dispatch(GovernanceActions.vote({ proposal, voteFor: 1 }));
    }
  };

  const handleAgainstClick = () => {
    if (library && proposal) {
      dispatch(GovernancePageActions.setIsModalOpen(true));
      dispatch(GovernanceActions.vote({ proposal, voteFor: 0 }));
    }
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <VoteFor
          disabled={disabled}
          loading={isLoadingFor === 1}
          onClick={handleForClick}
          fullWidth
        >
          {t(translations.GovernancePage.VoteFor())}
        </VoteFor>
      </Grid>

      <Grid item>
        <VoteAgainst
          disabled={disabled}
          loading={isLoadingFor === 0}
          onClick={handleAgainstClick}
          fullWidth
        >
          {t(translations.GovernancePage.VoteAgainst())}
        </VoteAgainst>
      </Grid>
    </Grid>
  );
};

const VoteFor = styled(ContainedButton)({
  backgroundColor: CssVariables.green,
});

const VoteAgainst = styled(ContainedButton)({
  backgroundColor: CssVariables.error,
});

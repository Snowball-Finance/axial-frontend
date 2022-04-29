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
import { Proposal } from "app/containers/BlockChain/Governance/types";
import { GovernancePageActions } from "app/pages/Governance/slice";

interface Props {
  proposal: Proposal;
}

export const VoteButtons: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();

  const library = useSelector(Web3Selectors.selectLibrary);
  const isLoadingFor = useSelector(GovernanceSelectors.isVotingFor);
  const receipt = useSelector(GovernanceSelectors.receipt);
  const isGettingReceipt = useSelector(GovernanceSelectors.isLoadingReceipt);

  const dispatch = useDispatch();

  const disabled = receipt?.hasVoted || isGettingReceipt || false;

  const handleForClick = () => {
    if (library) {
      dispatch(GovernancePageActions.setIsModalOpen(true));
      dispatch(GovernanceActions.vote({ proposal, voteFor: 0 }));
    }
  };

  const handleAgainstClick = () => {
    if (library) {
      dispatch(GovernancePageActions.setIsModalOpen(true));
      dispatch(GovernanceActions.vote({ proposal, voteFor: 1 }));
    }
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <VoteFor
          disabled={disabled}
          loading={isLoadingFor === 0}
          onClick={handleForClick}
          fullWidth
        >
          {t(translations.GovernancePage.VoteFor())}
        </VoteFor>
      </Grid>

      <Grid item>
        <VoteAgainst
          disabled={disabled}
          loading={isLoadingFor === 1}
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

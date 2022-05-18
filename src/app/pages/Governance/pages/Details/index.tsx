import { FC, useEffect } from "react";
import { Grid, Skeleton, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { Max1040 } from "app/components/wrappers/max1040";
import { VotingPowerInfo } from "../../components/VotingPowerInfo";
import { DocLinksAndInfo } from "./components/DocLinksAndInfo";
import { ProposalDescription } from "./components/ProposalDescription";
import { ProposalDetails } from "./components/ProposalDetails";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { Proposal } from "app/containers/BlockChain/Governance/types";
import { DetailNavigationHead } from "../../components/Navigation/DetailsNavigationHead";
import { VotingConfirmationModal } from "./components/VotingConfirmationModal";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { GovernancePageActions } from "../../slice";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { ConditionalVoting } from "./components/ConditionalVoting";

type TParams = { proposalIndex: string };

export const Details: FC = () => {
  const { t } = useTranslation();

  const { proposalIndex } = useParams<TParams>();
  const proposals = useSelector(GovernanceSelectors.proposals);
  const library = useSelector(Web3Selectors.selectLibrary);
  const isLoading = useSelector(GovernanceSelectors.isLoadingReceipt);

  const dispatch = useDispatch();

  const proposal: Proposal | undefined = proposals.find(
    (item) => item.governance_id === proposalIndex
  );

  useEffect(() => {
    if (library && proposal && proposalIndex) {
      dispatch(GovernanceActions.getVotingReceipt({ proposal }));
      dispatch(GovernancePageActions.setSelectedProposal(proposal));
    }
    return () => {};
  }, [library, proposal, proposalIndex]);

  if (proposals.length === 0) {
    return <>Loading</>;
  }

  if (proposal === undefined) {
    return <>proposal not found</>;
  }

  return (
    <>
      <VotingConfirmationModal />

      <StyledMax1040>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <DetailNavigationHead
              routeName={t(translations.GovernancePage.ProposalNumber(), {
                number: proposal.governance_id,
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <ProposalDetails />
          </Grid>

          <Grid item xs={12}>
            <VotingPowerInfo />
          </Grid>

          <Grid item xs={12}>
            {isLoading ? <StyledLoader /> : <ConditionalVoting />}
          </Grid>

          <Grid item xs={12}>
            <DocLinksAndInfo />
          </Grid>

          <Grid item xs={12}>
            <ProposalDescription />
          </Grid>
        </Grid>
      </StyledMax1040>
    </>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  margin: "0 auto",
}));

const StyledLoader = styled(Skeleton)({
  backgroundColor: CssVariables.primary,
});

import { FC } from "react";
import { Grid, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { Max1040 } from "app/components/wrappers/max1040";
import { VotingPowerInfo } from "../../components/VotingPowerInfo";
import { DocLinksAndInfo } from "./components/DocLinksAndInfo";
import { ProposalDescription } from "./components/ProposalDescription";
import { ProposalDetails } from "./components/ProposalDetails";
import { VoteOptions } from "./components/VoteOptions";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { Proposal } from "app/containers/BlockChain/Governance/types";
import { DetailNavigationHead } from "../../components/Navigation/DetailsNavigationHead";
import { VotingConfirmationModal } from "./components/VotingConfirmationModal";

type TParams = { proposalIndex: string };

export const Details: FC = () => {
  const { t } = useTranslation();

  const { proposalIndex } = useParams<TParams>();
  const proposals = useSelector(GovernanceSelectors.proposals);

  const proposal: Proposal | undefined = proposals.find(
    (item) => item.governance_id === proposalIndex
  );

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
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <DetailNavigationHead
              routeName={t(translations.GovernancePage.ProposalNumber(), {
                number: proposal.governance_id,
              })}
            />
          </Grid>

          <Grid item>
            <ProposalDetails proposal={proposal} />
          </Grid>

          <Grid item>
            <VotingPowerInfo />
          </Grid>

          <Grid item>
            <VoteOptions proposal={proposal} />
          </Grid>

          <Grid item>
            <DocLinksAndInfo
              discordLink={proposal?.discussion || ""}
              documentLink={proposal?.document || ""}
              startTime={proposal?.start_date || ""}
              endTime={proposal?.end_date || ""}
            />
          </Grid>

          <Grid item>
            <ProposalDescription description={proposal?.description} />
          </Grid>
        </Grid>
      </StyledMax1040>
    </>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  margin: "0 auto",
}));

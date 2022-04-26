import { Box, styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { Max1040 } from "app/components/wrappers/max1040";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import {
  Proposal,
  ProposalState,
} from "app/containers/BlockChain/Governance/types";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { VotePower } from "../../components/votePower";
import { GovernanceSubPages } from "../../routes";
import { ProposalListItem } from "../proposals/components/listItem";
import { AdditionalData } from "./components/additionalData";
import { TopBackButton } from "./components/topBackButton";
import { VoteButtons } from "./components/voteButtons";
import { VoteOptions } from "./components/voteOptions";
import { VoteStatus } from "./components/voteStatus";

export const ProposalDetails = () => {
  const { t } = useTranslation();
  const index = window.location.pathname.split(
    GovernanceSubPages.proposals + "/"
  )[1];

  const proposals = useSelector(GovernanceSelectors.proposals);
  if (proposals.length === 0) {
    return <>Loading</>;
  }
  const proposal: Proposal | undefined = proposals.find(
    (item) => item.governance_id === index
  );
  let isForAgainstType = true;
  if (proposal === undefined) {
    return <>proposal not found</>;
  }
  if (proposal?.execution_contexts.length > 1) {
    isForAgainstType = false;
  }

  const { proposal_state } = proposal;

  const isActive = proposal_state === ProposalState.Active;

  return (
    <Wrapper>
      <TopBackButton
        to={GovernanceSubPages.proposals}
        destinationName={t(
          translations.GovernancePage.AllProposals()
        ).toLocaleLowerCase()}
      />
      <Box mb="16px" />
      <ProposalListItem proposal={proposal} short />
      <Box mb="16px" />
      <VoteStatus proposal={proposal} />
      <Box mb="16px" />
      {isActive && (
        <>
          <VotePower />
          <Box mb="16px" />
          {isForAgainstType && <VoteButtons proposal={proposal} />}
          {!isForAgainstType && <VoteOptions />}
          <Box mb="16px" />
        </>
      )}
      <AdditionalData
        discordLink={proposal?.discussion || ""}
        documentLink={proposal?.document || ""}
        startTime={proposal?.start_date || ""}
        endTime={proposal?.end_date || ""}
      />
      <Box mb="16px" />

      <ContentWrapper>
        <Left>
          <Descriptions>
            <Title>{t(translations.Common.Description())}</Title>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: proposal?.metadata?.description.replace(
                  /•/g,
                  "<br /><br />"
                ),
              }}
            ></div> */}
          </Descriptions>
        </Left>
      </ContentWrapper>
    </Wrapper>
  );
};
const Title = styled("p")({
  margin: 0,
  fontSize: "16px",
  fontWeight: 500,
  color: CssVariables.commonTextColor,
  marginBottom: "12px",
});

const Descriptions = styled(SnowPaper)({
  padding: "18px 16px",
  fontSize: "12px",
  color: CssVariables.commonTextColor,
});

const ContentWrapper = styled(Box)({
  display: "flex",
  gap: "16px",
  paddingBottom: "12px",
  [mobile]: {
    flexDirection: "column",
    padding: "0 16px",
  },
});
const Left = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const Wrapper = styled(Max1040)({
  margin: "auto",
});

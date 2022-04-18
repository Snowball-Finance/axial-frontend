import { Box, styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { Max1040 } from "app/components/wrappers/max1040";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { ProposalState } from "app/containers/BlockChain/Governance/types";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { VotePower } from "../../components/votePower";
import { GovernanceSubPages } from "../../routes";
import { ProposalListItem } from "../proposals/components/listItem";
import { TopBackButton } from "./components/topBackButton";
import { VoteButtons } from "./components/voteButtons";
import { VoteStatus } from "./components/voteStatus";

export const ProposalDetails = () => {
  const { t } = useTranslation();
  const index = Number(
    window.location.pathname.split(GovernanceSubPages.proposals + "/")[1]
  );

  const proposals = useSelector(GovernanceSelectors.selectProposals);
  if (proposals.length === 0) {
    return <>Loading</>;
  }
  const proposal = proposals.find((item) => item.index === index);

  if (proposal === undefined) {
    return <>proposal not found</>;
  }

  const { state } = proposal;

  const isActive = state === ProposalState.Active;

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
          <VoteButtons proposal={proposal} />
          <Box mb="16px" />
        </>
      )}
      {/* <AdditionalData
        discordLink={proposal?.metadata?.discussion}
        documentLink={proposal?.metadata?.document}
        startTime={proposal.startDate}
        endTime={proposal.endDate}
      /> */}
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

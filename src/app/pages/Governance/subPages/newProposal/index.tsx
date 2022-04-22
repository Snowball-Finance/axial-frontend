import { styled } from "@mui/material";
import { Max1040 } from "app/components/wrappers/max1040";
import { VotePower } from "app/pages/Governance/components/votePower";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { Execution } from "./execution";
import { ProposalForm } from "./proposalForm";
import { ProposalInfo } from "./proposalInfo";
import { NewProposalSubmitButton } from "./submitButton";

export const NewProposalForm = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ProposalBodyWrapper>
          <VotePower />
          <ProposalInfo />
          <ProposalForm />
          <Execution />
          <SubmitWrapper>
            <NewProposalSubmitButton />
          </SubmitWrapper>
        </ProposalBodyWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const ProposalBodyWrapper = styled("div")({
  width: "100%",
  display: "flex",
  gap: "16px",
  flexDirection: "column",
  [mobile]: {
    flexDirection: "column-reverse",
  },
});

const ContentWrapper = styled(Max1040)({
  margin: "auto",
  height: "100%",
  padding: "24px 44px",
  borderRadius: CssVariables.paperBorderRadius,
  [mobile]: {
    overflow: "auto",
  },
});

const Wrapper = styled("div")(() => ({
  top: 0,
  zIndex: 2,
  width: "100%",
}));

const SubmitWrapper = styled("div")({
  display: "flex",
  alignSelf: "end",
});

import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { VotePower } from "app/pages/Governance/components/votePower";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { DiscussionInput } from "./inputs/discussion";
import { DocumentInput } from "./inputs/document";
import { VotingPeriodInput } from "./inputs/votingPeriod";

export const RightSection = () => {
  const { t } = useTranslation();
  const account = useSelector(Web3Selectors.selectAccount);
  const proposer = account;
  const censoredProposer = proposer
    ? proposer.substring(0, 6) +
      "***" +
      proposer.substring(proposer.length - 4, proposer.length)
    : t("NoConnectedWallet");

  return (
    <Wrapper>
      <VotePower />
      <RightSnowPaper>
        <ProposerWrapper>
          <TopTitle>{t(translations.GovernancePage.Proposedby())}</TopTitle>
          <Account>{censoredProposer}</Account>
        </ProposerWrapper>
        <InputTitle>
          {t(translations.GovernancePage.VotingPeriod())}
          <span> *</span>
        </InputTitle>
        <VotingPeriodInput />
        <InputTitle>
          {t(translations.GovernancePage.DiscussionURL())}
        </InputTitle>
        <DiscussionInput />
        <InputTitle>
          {t(translations.GovernancePage.ProsConsDocumentURL())}
        </InputTitle>
        <DocumentInput />
      </RightSnowPaper>
    </Wrapper>
  );
};

const InputTitle = styled("p")({
  fontSize: "16px",
  margin: 0,
  color: CssVariables.commonTextColor,
  span: {
    color: CssVariables.red,
  },
});

const Account = styled("p")({
  fontSize: "12px",
  fontWeight: "500",
  margin: 0,
  color: CssVariables.commonTextColor,
});

const TopTitle = styled("p")({
  fontSize: "16px",
  fontWeight: "500",
  margin: 0,
  color: CssVariables.commonTextColor,
});

const ProposerWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
  
});

const Column = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});
const RightSnowPaper = styled(SnowPaper)({
  padding: "20px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

const Wrapper = styled(Column)({
  ".MuiFormControl-root": {
    margin: 0,
  },
  '.MuiTypography-root':{
    color:CssVariables.commonTextColor,
  },
  'input,textarea': {
    color:CssVariables.commonTextColor,
  }
});

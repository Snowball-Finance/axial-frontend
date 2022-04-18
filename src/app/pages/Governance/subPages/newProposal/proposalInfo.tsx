import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { DiscussionInput } from "./inputs/discussion";
import { DocumentInput } from "./inputs/document";
import { VotingPeriodInput } from "./inputs/votingPeriod";

export const ProposalInfo = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <RightSnowPaper>
        <InputTitle>
          {t(translations.GovernancePage.DiscussionURL())}
        </InputTitle>
        <DiscussionInput />
        <InputTitle>
          {t(translations.GovernancePage.ProsConsDocumentURL())}
        </InputTitle>
        <DocumentInput />
        <InputTitle>
          {t(translations.GovernancePage.VotingPeriod())}
          <span> *</span>
        </InputTitle>
        <VotingPeriodInput />
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
  ".MuiTypography-root": {
    color: CssVariables.commonTextColor,
  },
  "input,textarea": {
    color: CssVariables.commonTextColor,
  },
});

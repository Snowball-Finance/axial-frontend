import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { DescriptionInput } from "./inputs/description";
import { TitleInput } from "./inputs/title";
import { NewProposalSubmitButton } from "./submitButton";

export const ProposalForm = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <LeftSnowPaper>
        <InputTitle>
          {t(translations.GovernancePage.Titleofnewproposal())}
          <span> *</span>
        </InputTitle>
        <TitleInput />
        <InputTitle>
          {t(translations.GovernancePage.Descriptionofnewproposal())}
          <span> *</span>
        </InputTitle>
        <DescriptionInput />
        <BottomDescription>
          <span>* </span>
          {t(translations.GovernancePage.Requiredfields())}
        </BottomDescription>
        <SubmitWrapper>
          <NewProposalSubmitButton />
        </SubmitWrapper>
      </LeftSnowPaper>
    </Wrapper>
  );
};
const Column = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});
const Wrapper = styled(Column)({
  flex: 1,
  "input,textarea": {
    color: CssVariables.commonTextColor,
  },
});

const LeftSnowPaper = styled(SnowPaper)({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  ".MuiFormControl-root": {
    margin: 0,
  },
});
const BottomDescription = styled("p")({
  fontSize: "12",
  color: CssVariables.commonTextColor,
  margin: "0",
  span: {
    color: CssVariables.red,
  },
});

const SubmitWrapper = styled("div")({
  display: "flex",
  alignSelf: "end",
});

const InputTitle = styled("p")({
  fontSize: "20px",
  color: CssVariables.commonTextColor,
  margin: "0",
  span: {
    color: CssVariables.red,
  },
});

import { styled } from "@mui/material";
import { SectionTitle } from "app/pages/Governance/components/title";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";

export const Execution = () => {
  const { t } = useTranslation();

  return (
    <>
      <Wrapper >
        <SectionTitle>
          {t(translations.GovernancePage.Execution())}
        </SectionTitle>
      </Wrapper>
    </>
  )
}

const Wrapper = styled('div')({})


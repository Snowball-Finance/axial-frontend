import { FC } from "react";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";

export const NewProposalButton: FC = () => {
  const { t } = useTranslation();

  return (
    <ContainedButton>
      {t(translations.GovernancePage.NewProposal())}
    </ContainedButton>
  );
};

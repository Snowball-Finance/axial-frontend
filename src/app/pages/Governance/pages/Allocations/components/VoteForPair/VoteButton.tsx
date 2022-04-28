import { FC } from "react";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { VoteConfirmationModal } from "./VoteConfirmationModal";

export const VoteButton: FC = () => {
  //   const { t } = useTranslation();

  return (
    <>
      <VoteConfirmationModal />
      
      <ContainedButton>Vote</ContainedButton>
    </>
  );
};

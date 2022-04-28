import { FC } from "react";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { SnowModal } from "app/components/common/modal";
import { VotePreferredPairModal } from "app/pages/Governance/components/modal/VotePreferredPair";

export const VoteConfirmationModal: FC = () => {
  // const { t } = useTranslation();

  return (
    <SnowModal isOpen={false} onClose={() => {}} title="Vote preferred pairs">
      <VotePreferredPairModal />
    </SnowModal>
  );
};

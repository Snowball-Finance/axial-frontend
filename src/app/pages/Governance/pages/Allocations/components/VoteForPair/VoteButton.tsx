import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { VoteConfirmationModal } from "./VoteConfirmationModal";
import { WalletToggle } from "app/components/common/walletToggle";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { selectIsLoadingUserPoolsAndGauges } from "app/containers/PoolsAndGauges/selectors";

export const VoteButton: FC = () => {
  const { t } = useTranslation();

  const isLoading = useSelector(selectIsLoadingUserPoolsAndGauges);
  const dispatch = useDispatch();

  const handleVoteClick = () => {
    dispatch(GovernancePageActions.setIsVoteAllocationModalOpen(true));
  };

  return (
    <>
      <VoteConfirmationModal />

      <NeedsWalletConnection
        connected={
          <ContainedButton onClick={handleVoteClick} disabled={isLoading}>
            {t(translations.GovernancePage.VoteAllocation.Vote())}
          </ContainedButton>
        }
        disConnected={<WalletToggle />}
      />
    </>
  );
};

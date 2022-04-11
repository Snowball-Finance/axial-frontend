import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const RewardsWithdrawButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(RewardsSelectors.isWithdrawing);
  const withdrawAmount = useSelector(RewardsPageSelectors.withdrawAmount);
  const disabled = isNaN(Number(withdrawAmount)) || Number(withdrawAmount) <= 0;
  const handleWithdrawClick = () => {
    dispatch(RewardsPageActions.withdraw());
  };

  return (
    <NeedsWalletConnection
      connected={
        <ContainedButton
          height={42}
          onClick={handleWithdrawClick}
          loading={loading}
          disabled={disabled}
          fullWidth
        >
          {t(translations.RewardsPage.ActionButtons.Withdraw())}
        </ContainedButton>
      }
      disConnected={<WalletToggle fullWidth />}
    />
  );
};

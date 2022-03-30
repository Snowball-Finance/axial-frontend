import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { zeroString } from "app/pages/Liquidity/constants";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const DepositButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const depositValue = useSelector(RewardsPageSelectors.depositValue);
  const loading = useSelector(RewardsSelectors.isDepositing);
  const handleDepositClick = () => {
    dispatch(RewardsPageActions.deposit());
  };
  return (
    <NeedsWalletConnection
      connected={
        <ContainedButton
          loading={loading}
          onClick={() => {
            handleDepositClick();
          }}
          disabled={
            !depositValue ||
            depositValue === zeroString ||
            (!isNaN(Number(depositValue)) && Number(depositValue) === 0)
          }
          width={220}
          height={42}
        >
          {t(translations.RewardsPage.ActionButtons.Deposit())}
        </ContainedButton>
      }
      disConnected={<WalletToggle />}
    />
  );
};

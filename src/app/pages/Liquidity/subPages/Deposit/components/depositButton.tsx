import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const DepositButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const depositTokens = useSelector(
    LiquidityPageSelectors.liquidityDepositTokenAmounts
  );
  const disabled = Object.values(depositTokens).every(
    (tokenAmount) => tokenAmount === "0"
  );
  const isDepositing = useSelector(RewardsSelectors.isDepositing);
  const handleDepositClick = () => {
    dispatch(LiquidityPageActions.setDepositConfirmationData(true));
  };
  return (
    <NeedsWalletConnection
      connected={
        <ContainedButton
          width={220}
          height={42}
          disabled={disabled}
          loading={isDepositing}
          onClick={handleDepositClick}
        >
          {t(translations.LiquidityPage.ActionButtons.Deposit())}
        </ContainedButton>
      }
      disConnected={<WalletToggle />}
    />
  );
};

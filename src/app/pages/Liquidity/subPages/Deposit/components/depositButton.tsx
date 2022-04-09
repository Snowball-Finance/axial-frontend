import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
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
  const handleDepositClick = () => {
    dispatch(LiquidityPageActions.buildTransactionData());
  };
  return (
    <NeedsWalletConnection
      connected={
        <ContainedButton
          height={42}
          disabled={disabled}
          onClick={handleDepositClick}
          fullWidth
        >
          {t(translations.LiquidityPage.ActionButtons.Deposit())}
        </ContainedButton>
      }
      disConnected={<WalletToggle fullWidth />}
    />
  );
};

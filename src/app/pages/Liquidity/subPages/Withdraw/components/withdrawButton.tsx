import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const WithdrawButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const withdrawTokens = useSelector(
    LiquidityPageSelectors.withdrawTokenAmounts
  );

  const disabled = Object.values(withdrawTokens).every(
    (tokenAmount) => tokenAmount === "0"
  );
  const isWithdrawing = useSelector(RewardsSelectors.isWithdrawing);

  const handleWithdrawClick = () => {
    dispatch(LiquidityPageActions.buildWithdrawReviewData());
  };
  return (
    <NeedsWalletConnection
      connected={
        <ContainedButton
          height={42}
          disabled={disabled}
          loading={isWithdrawing}
          onClick={handleWithdrawClick}
          fullWidth
        >
          {t(translations.LiquidityPage.ActionButtons.Withdraw())}
        </ContainedButton>
      }
      disConnected={<WalletToggle fullWidth />}
    />
  );
};

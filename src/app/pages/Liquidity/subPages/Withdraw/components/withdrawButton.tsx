import { globalSelectors } from "app/appSelectors";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import {
  ApproveAndWithdrawPayload,
  WithdrawType,
} from "app/containers/Rewards/types";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { floatToBN } from "common/format";
import { BigNumber } from "ethers";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const WithdrawButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const withdrawTokens = useSelector(
    LiquidityPageSelectors.withdrawTokenToShow()
  );
  const selectedPool = useSelector(LiquidityPageSelectors.selectedPool);
  const tokens = useSelector(globalSelectors.tokens);
  const disabled = Object.values(withdrawTokens).every(
    (tokenAmount) => tokenAmount === "0"
  );
  const isWithdrawing = useSelector(RewardsSelectors.isWithdrawing);
  const handleWithdrawClick = () => {
    if (selectedPool && tokens) {
      const tmpAmounts = {};
      for (let k in withdrawTokens) {
        const v = withdrawTokens[k];
        const num = Number(v);
        const toSend = floatToBN(num, tokens[k].decimals);
        tmpAmounts[k] = toSend;
      }
      const dataToSend: ApproveAndWithdrawPayload = {
        poolName: selectedPool.key,
        type: WithdrawType.IMBALANCE,
        lpTokenAmountToSpend: BigNumber.from(0),
        tokenAmounts: tmpAmounts,
      };
      dispatch(LiquidityPageActions.withdraw(dataToSend));
    }
  };
  return (
    <NeedsWalletConnection
      connected={
        <ContainedButton
          width={220}
          height={42}
          disabled={disabled}
          loading={isWithdrawing}
          onClick={handleWithdrawClick}
        >
          {t(translations.LiquidityPage.ActionButtons.Withdraw())}
        </ContainedButton>
      }
      disConnected={<WalletToggle />}
    />
  );
};

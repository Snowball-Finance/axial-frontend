import { globalSelectors } from "app/appSelectors";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { Token } from "app/containers/Swap/types";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { parseUnits } from "ethers/lib/utils";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Pool } from "app/containers/Rewards/types";
import { zeroString } from "app/pages/Liquidity/constants";

export const DepositButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const depositTokens = useSelector(
    LiquidityPageSelectors.liquidityDepositTokenAmounts
  );
  const tokens = useSelector(globalSelectors.tokens) as Token[];
  const pool = useSelector(LiquidityPageSelectors.selectedPool) as Pool;
  const depositRaw = useSelector(LiquidityPageSelectors.depositRaw);
  const poolTokens = depositRaw
    ? pool.poolTokens
    : pool.underlyingPoolTokens || pool.poolTokens;

  let depositError = {};
  poolTokens.forEach((item) => {
    if (tokens && pool) {
      const token = tokens[item.symbol];
      if (
        token?.balance &&
        token?.balance.lt(
          parseUnits(
            depositTokens[item.symbol] ?? zeroString,
            token?.decimals || 18
          )
        )
      ) {
        depositError = { ...depositError, [item.symbol]: true };
      } else {
        depositError = { ...depositError, [item.symbol]: false };
      }
    }
  });

  const isAmountZero = Object.values(depositTokens).every(
    (tokenAmount) => tokenAmount === "0"
  );
  const isDepsitError = Object.values(depositError).every((error) => !error);

  const disabled = isAmountZero || !isDepsitError;
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

import { globalSelectors } from "app/appSelectors";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { Token } from "app/containers/Swap/types";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { parseUnits } from "ethers/lib/utils";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const DepositButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const depositValue = useSelector(RewardsPageSelectors.depositValue);
  const selectedPool = useSelector(RewardsPageSelectors.selectedPool);
  const loading = useSelector(RewardsSelectors.isDepositing);
  const tokens = useSelector(globalSelectors.tokens) as Token[];

  let depositError = "";
  if (tokens && selectedPool) {
    const token = tokens[selectedPool?.lpToken.symbol];
    if (token?.balance && token?.balance.eq(0)) {
      depositError = "You don't have Balance on this pool";
    } else if (token?.balance && token?.balance.lt(parseUnits(depositValue))) {
      depositError = "Insufficient Balance";
    } else {
      depositError = "";
    }
  }

  const disabled =
    isNaN(Number(depositValue)) ||
    Number(depositValue) <= 0 ||
    depositError !== "";

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
          disabled={disabled}
          height={42}
          fullWidth
        >
          {depositError || t(translations.RewardsPage.ActionButtons.Deposit())}
        </ContainedButton>
      }
      disConnected={<WalletToggle fullWidth />}
    />
  );
};

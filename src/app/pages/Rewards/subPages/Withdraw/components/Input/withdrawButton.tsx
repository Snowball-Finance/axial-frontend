import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { UserShareData } from "app/containers/Rewards/types";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { tokens } from "app/tokens";
import { floatToBN } from "common/format";
import { BigNumber } from "ethers";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const RewardsWithdrawButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedPool = useSelector(RewardsPageSelectors.selectedPool);
  const userShareData: UserShareData = useSelector(
    RewardsSelectors.userShareData(selectedPool?.key)
  );
  const percent = useSelector(RewardsPageSelectors.withdrawPercentage);
  const loading = useSelector(RewardsSelectors.isWithdrawing);
  const withdrawAmount = useSelector(RewardsPageSelectors.withdrawAmount);
  const poolsBalances = useSelector(RewardsSelectors.poolsBalances);
  
  const tokenKey = selectedPool?.lpToken.symbol;

  let withdrawError = "";
  if (tokenKey && poolsBalances) {
    if (poolsBalances[tokenKey]?.userInfo.amount.eq(0)) {
      withdrawError = "You don't have Balance on this pool";
    } else if (
      !percent &&
      poolsBalances[tokenKey]?.userInfo.amount.lt(
        floatToBN(withdrawAmount, tokens[tokenKey].decimals) ||
          BigNumber.from(0)
      )
    ) {
      withdrawError = "Insufficient Balance";
    } else {
      withdrawError = "";
    }
  }
  const disabled =
    isNaN(Number(withdrawAmount)) ||
    Number(withdrawAmount) <= 0 ||
    !userShareData ||
    withdrawError !== "";

    
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
          {withdrawError ||
            t(translations.RewardsPage.ActionButtons.Withdraw())}
        </ContainedButton>
      }
      disConnected={<WalletToggle fullWidth />}
    />
  );
};

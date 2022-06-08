import styled from "@emotion/styled";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { UserShareData } from "app/containers/Rewards/types";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "styles/media";

export const WithdrawButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedPool = useSelector(LiquidityPageSelectors.selectedPool);
  const userShareData: UserShareData = useSelector(
    RewardsSelectors.userShareData(selectedPool?.key)
  );
  const withdrawTokens = useSelector(
    LiquidityPageSelectors.withdrawTokenAmounts
  );
  let withdrawError = useSelector(LiquidityPageSelectors.withdrawError);
  if (userShareData?.lpTokenBalance.eq(0)) {
    withdrawError = {
      main: "You don't have Balance on this pool",
    };
  }
  const disabled =
    Object.values(withdrawTokens).every((tokenAmount) => tokenAmount === "0") ||
    !userShareData ||
    withdrawError !== undefined;

  const handleWithdrawClick = () => {
    dispatch(LiquidityPageActions.buildWithdrawReviewData());
  };
  return (
    <NeedsWalletConnection
      connected={
        <StyledContainedButton
          height={42}
          disabled={disabled}
          onClick={handleWithdrawClick}
          fullWidth
        >
          {withdrawError?.main ||
            t(translations.LiquidityPage.ActionButtons.Withdraw())}
        </StyledContainedButton>
      }
      disConnected={<WalletToggle fullWidth />}
    />
  );
};
const StyledContainedButton = styled(ContainedButton)({
  [mobile]:{
    fontSize:'12px'
  }
})
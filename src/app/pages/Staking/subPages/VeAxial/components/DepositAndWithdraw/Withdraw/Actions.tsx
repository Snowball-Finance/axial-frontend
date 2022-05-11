import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { StakingPageActions } from "app/pages/Staking/slice";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";

export const Actions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isWithdrawing = useSelector(
    StakingSelectors.isWithdrawingAccruingToken
  );
  const rawTokenBalance = useSelector(GovernanceSelectors.accruingTokenBalance);

  const handleWithdrawButtonClick = () => {
    if (isWithdrawing) return;
    dispatch(StakingPageActions.setIsModalOpen(true));
    dispatch(StakingActions.withdrawAccruingToken());
  };

  const disabled = rawTokenBalance?.eq(0);

  return (
    <NeedsWalletConnection
      connected={
        <ContainedButton
          height={42}
          loading={isWithdrawing}
          disabled={disabled}
          onClick={handleWithdrawButtonClick}
          fullWidth
        >
          {t(translations.Staking.Withdraw())}
        </ContainedButton>
      }
      disConnected={<WalletToggle fullWidth />}
    />
  );
};

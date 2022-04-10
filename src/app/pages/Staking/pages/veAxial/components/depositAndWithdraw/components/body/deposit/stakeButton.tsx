import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const StakeButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isStaking = useSelector(StakingSelectors.selectIsStaking);

  const handleStakeButtonClick = () => {
    if (isStaking) return;
    dispatch(StakingPageActions.stakeAccruingToken());
  };

  return (
    <NeedsWalletConnection
      connected={
        <ContainedButton
          height={42}
          loading={isStaking}
          id="stakeButton"
          onClick={handleStakeButtonClick}
        >
          {t(translations.Staking.Deposit())}
        </ContainedButton>
      }
      disConnected={<WalletToggle />}
    />
  );
};

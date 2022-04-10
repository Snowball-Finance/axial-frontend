import { ContainedButton } from "app/components/common/buttons/containedButton";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const WithdrawButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isWithdrawing = useSelector(StakingSelectors.selectIsWithdrawing);

  const handleWithdrawButtonClick = () => {
    if (isWithdrawing) return;
    dispatch(StakingActions.withdrawGovernanceToken());
  };

  return (
    <ContainedButton
      loading={isWithdrawing}
      onClick={handleWithdrawButtonClick}
    >
      {t(translations.Staking.WithdrawTokens())}
    </ContainedButton>
  );
};

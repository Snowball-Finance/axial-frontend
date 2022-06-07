import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { BlockChainSelectors } from "app/containers/BlockChain/selectors";
import { env } from "environment";
import { BNToFloat, floatToBN } from "common/format";
import { BigNumber } from "ethers";

export const Actions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isStaking = useSelector(StakingSelectors.selectIsStaking);
  const enteredAmount = useSelector(
    StakingPageSelectors.selectEnteredMainTokenToStakeIntoVeAxial
  );
  const mainTokenBalance = useSelector(
    BlockChainSelectors.selectMainTokenBalance
  );

  let depositError = "";
  if (mainTokenBalance?.eq(0)) {
    depositError = "You don't have Balance on this pool";
  } else if (
    enteredAmount !== "" &&
    (mainTokenBalance || BigNumber.from(0)).lt(floatToBN(enteredAmount||"0")||BigNumber.from(0)) 
  ) {
    depositError = "Insufficient Balance";
  } else {
    depositError = "";
  }

  const disabled =
    enteredAmount === "" || isNaN(Number(enteredAmount)) || depositError !== "";
  const tokenName = env.MAIN_TOKEN_NAME;

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
          disabled={disabled}
          id="stakeButton"
          onClick={handleStakeButtonClick}
          fullWidth
        >
          {depositError || t(translations.Staking.Stake())} {tokenName}
        </ContainedButton>
      }
      disConnected={<WalletToggle fullWidth />}
    />
  );
};

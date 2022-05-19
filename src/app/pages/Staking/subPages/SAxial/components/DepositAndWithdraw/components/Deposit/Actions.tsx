import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { NeedsWalletConnection } from "app/components/common/needsWalletConnection";
import { WalletToggle } from "app/components/common/walletToggle";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { BlockChainSelectors } from "app/containers/BlockChain/selectors";
import { zeroString } from "app/pages/Liquidity/constants";
import { env } from "environment";
import { BigNumber } from "ethers";
import { floatToBN } from "common/format";

export const Actions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isStaking = useSelector(StakingSelectors.selectIsStaking);
  const enteredAmount = useSelector(
    StakingPageSelectors.selectEnteredMainTokenToStake
  );
  const mainTokenBalance = useSelector(
    BlockChainSelectors.selectMainTokenBalance
  );
  const bnEnteredAmount =
    floatToBN(enteredAmount || zeroString, 18) || BigNumber.from(0);

  let depositError = "";
  if (mainTokenBalance?.eq(0)) {
    depositError = "You don't have Balance on this pool";
  } else if (
    enteredAmount !== "" &&
    bnEnteredAmount.gt(mainTokenBalance || BigNumber.from(0))
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
    dispatch(StakingPageActions.stakeGovernanceToken());
  };

  return (
    <NeedsWalletConnection
      connected={
        <ContainedButton
          height={42}
          disabled={disabled}
          loading={isStaking}
          id="stakeButton"
          onClick={handleStakeButtonClick}
          fullWidth
        >
          {depositError || `${t(translations.Staking.Lock())} ${tokenName}`}
        </ContainedButton>
      }
      disConnected={<WalletToggle fullWidth />}
    />
  );
};

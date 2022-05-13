import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { useDispatch, useSelector } from "react-redux";
import { RewardsPageActions } from "../../slice";
import { ClaimConfirmationModal } from "./ClaimConfirmationModal";
import { PoolsAndGaugesSelectors } from "app/containers/PoolsAndGauges/selectors";
import { RewardsPageSelectors } from "../../selectors";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";

export const Actions: FC = () => {
  const { t } = useTranslation();
  const pool = useSelector(RewardsPageSelectors.selectedPool);
  const key = pool?.key;
  const harvestables = useSelector(
    PoolsAndGaugesSelectors.harvestableTokensOfPool(key)
  );
  const poolsBalances = useSelector(RewardsSelectors.poolsBalances);
  const account = useSelector(Web3Selectors.selectAccount);
  const tokenKey = pool?.lpToken.symbol || "";

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(RewardsPageActions.setTokensToClaim(harvestables));
  };

  return (
    <>
      <ClaimConfirmationModal pool={pool} />
      <ContainedButton
        fullWidth
        onClick={handleClick}
        disabled={
          !account ||
          (poolsBalances &&
            poolsBalances[tokenKey]?.pendingTokens.pendingAxial.eq("0x0"))
        }
      >
        {t(translations.RewardsPage.ActionButtons.ClaimRewards())}
      </ContainedButton>
    </>
  );
};

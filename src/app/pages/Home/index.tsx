/**
 *
 * HomePage
 *
 */

import React from "react";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { HomePageReducer, sliceKey } from "./slice";
import { homePageSaga } from "./saga";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { AppPages } from "app/types";
import { WalletToggle } from "app/components/common/walletToggle";
import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";

export const HomePage = () => {
  useInjectReducer({ key: sliceKey, reducer: HomePageReducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  const dispatch = useDispatch();

  const handleNavigateToGovernanceClick = () => {
    dispatch(push(AppPages.GovernancePage));
  };

  const handleNavigateToStakingClick = () => {
    dispatch(push(AppPages.StakingPage));
  };

  const handleTestStakingClick = () => {
    dispatch(
      StakingActions.createLock({
        duration: "1200",
        date: new Date().toISOString(),
        balance: "0",
      })
    );
  };
  const readyForStaking = useSelector(StakingSelectors.selectReadyForStaking);
  const isStaking = useSelector(StakingSelectors.selectIsStaking);

  const synced = useSelector(
    GovernanceSelectors.selectSyncedProposalsWithBlockChain
  );
  const handleSetSyncProposals = () => {
    dispatch(GovernanceActions.setSyncedProposalsWithBlockchain(false));
  };

  return (
    <>
      <ContainedButton onClick={handleNavigateToGovernanceClick}>
        Go To Governance
      </ContainedButton>
      <ContainedButton onClick={handleNavigateToStakingClick}>
        Go To Staking
      </ContainedButton>
      <WalletToggle />
      <ContainedButton loading={isStaking} onClick={handleSetSyncProposals}>
        Synced Proposals {synced.toString()}
      </ContainedButton>
      <ContainedButton
        loading={isStaking}
        disabled={!readyForStaking}
        onClick={handleTestStakingClick}
      >
        test Staking
      </ContainedButton>
    </>
  );
};

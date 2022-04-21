import { FC } from "react";
import { styled, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { StakingTabs } from "app/pages/Staking/components/Tabs";
import { DepositAndWithdrawTab } from "app/pages/Staking/types";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { Deposit } from "app/pages/Staking/subPages/VeAxial/components/DepositAndWithdraw/Deposit";
import { Withdraw } from "app/pages/Staking/subPages/VeAxial/components/DepositAndWithdraw/Withdraw";
import { StakingPageActions } from "app/pages/Staking/slice";

const tabs = (t: any): { title: string; value: DepositAndWithdrawTab }[] => [
  {
    title: "stake",
    value: DepositAndWithdrawTab.Deposit,
  },
  {
    title: "withdraw",
    value: DepositAndWithdrawTab.Withdraw,
  },
];

export const DepositAndWithdraw: FC = () => {
  const dispatch = useDispatch();

  const selectedTab: DepositAndWithdrawTab = useSelector(
    StakingPageSelectors.selectedVeAxialWithdrawAndDepositTab
  );

  const handleTabChange = (tab: DepositAndWithdrawTab) => {
    dispatch(StakingPageActions.setSelectedVeAxialDepositAndWithdrawTab(tab));
  };

  return (
    <StyledPoolCard>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StakingTabs
            tabs={tabs}
            onChange={handleTabChange}
            selectedTab={selectedTab}
          />
        </Grid>

        <Grid item xs={12}>
          {selectedTab === DepositAndWithdrawTab.Deposit && <Deposit />}
          {selectedTab === DepositAndWithdrawTab.Withdraw && <Withdraw />}
        </Grid>
      </Grid>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "26px 36px",
});

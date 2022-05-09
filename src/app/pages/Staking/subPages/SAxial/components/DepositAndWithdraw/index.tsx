import { FC } from "react";
import { styled, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { StakingTabs } from "app/pages/Staking/components/Tabs";
import { DepositAndWithdrawTab } from "app/pages/Staking/types";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { Deposit } from "app/pages/Staking/subPages/SAxial/components/DepositAndWithdraw/components/Deposit";
import { Withdraw } from "app/pages/Staking/subPages/SAxial/components/DepositAndWithdraw/components/Withdraw";
import { StakingPageActions } from "app/pages/Staking/slice";
import { mobile } from "styles/media";

const tabs = (t: any): { title: string; value: DepositAndWithdrawTab }[] => [
  {
    title: "lock",
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
    StakingPageSelectors.selectSelectedWithdrawAndDepositTab
  );

  const handleTabChange = (tab: DepositAndWithdrawTab) => {
    dispatch(StakingPageActions.setSelectedDepositAndWithdrawTab(tab));
  };

  return (
    <StyledPoolCard>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StakingTabs
            tabs={tabs}
            selectedTab={selectedTab}
            onChange={handleTabChange}
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

  [mobile]: {
    padding: "15px 15px"
  }
});

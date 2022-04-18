import { styled, Tab, Tabs } from "@mui/material";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { DepositAndWithdrawTab } from "app/pages/Staking/types";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
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

export const StakingTabs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedTab: DepositAndWithdrawTab = useSelector(
    StakingPageSelectors.selectSelectedWithdrawAndDepositTab
  );

  const handleTabChange = (tab: DepositAndWithdrawTab) => {
    dispatch(StakingPageActions.setSelectedDepositAndWithdrawTab(tab));
  };

  return (
    <Wrapper>
      <Tabs
        value={selectedTab}
        onChange={(_, v) => handleTabChange(v)}
        // indicatorColor="primary"
        textColor="primary"
      >
        {tabs(t).map((item, index: number) => {
          return (
            <Tab
              disableRipple
              value={item.value}
              key={"segment" + index}
              label={
                <>
                  <span>{item.title}</span>
                </>
              }
            />
          );
        })}
      </Tabs>
    </Wrapper>
  );
};
const Wrapper = styled("div")({
  padding: "0 32px 14px 32px",
  borderBottom: `6px solid ${CssVariables.cardBorder}`,
  ".MuiTabs-indicator": {
    display: "none",
  },
  span: {
    textTransform: "uppercase",
    fontSize: "26px",
    fontWeight: 600,
    color: CssVariables.commonTextColor,
    fontFamily: "Fugaz One !important",
  },
  ".Mui-selected": {
    span: {
      color: CssVariables.primary,
    },
  },
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,

  [mobile]: {
    width: "100%",
    padding: 0,
  },
});

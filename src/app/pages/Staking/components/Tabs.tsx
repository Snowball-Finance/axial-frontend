import { styled, Tab, Tabs, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { CssVariables } from "styles/cssVariables/cssVariables";

export const StakingTabs = ({ tabs, selectedTab, onChange }) => {
  const { t } = useTranslation();

  return (
    <StyledTabs value={selectedTab} onChange={(_, v) => onChange(v)}>
      {tabs(t).map((item, index: number) => {
        return (
          <StyledTab
            disableRipple
            value={item.value}
            key={"segment" + index}
            label={<Text variant="h2">{item.title}</Text>}
          />
        );
      })}
    </StyledTabs>
  );
};

const StyledTabs = styled(Tabs)({
  ".MuiTabs-indicator": {
    display: "none",
  },
});

const StyledTab = styled(Tab)({
  marginRight: 30,

  "&.MuiTab-root": {
    minWidth: 0,
    padding: 0,
  },

  "&:hover": {
    h2: {
      color: CssVariables.green,
      opacity: 1,
    },
  },

  "&.Mui-selected": {
    borderBottom: "none",
    h2: {
      color: CssVariables.green,
    },
  },
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

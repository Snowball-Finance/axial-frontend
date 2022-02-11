import { styled, Tab, Tabs } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { replace } from "connected-react-router";
import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernanceSubPages } from "../../routes";

const subPages = ({ t }) => [
  {
    path: GovernanceSubPages.proposals,
    title: t(translations.GovernancePage.Tabs.Proposals()),
  },
];
interface Page {
  path: string;
  title: string;
}

export const NavigationTabs: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  let path = location.pathname;
  path = GovernanceSubPages.proposals;
  const pages = subPages({ t });
  const handleTabChange = (page: string) => {
    dispatch(replace(page));
  };

  return (
    <Wrapper>
      <Tabs
        value={path}
        onChange={(_, path) => handleTabChange(path)}
        indicatorColor="primary"
        textColor="primary"
      >
        {pages.map((item: Page, index: number) => {
          return (
            <Tab
              disableRipple={true}
              className={`${index === 0 ? "first" : ""} ${
                index === pages.length - 1 ? "last" : ""
              }  `}
              value={item.path}
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

const Wrapper = styled(SnowPaper)({
  ".MuiTabs-indicator": {
    backgroundColor: CssVariables.primary,
  },
  span: {
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 600,
    color: CssVariables.navigationTabTextColor,
  },
  ".Mui-selected": {
    span: {
      color: CssVariables.primary,
    },
  },
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
});

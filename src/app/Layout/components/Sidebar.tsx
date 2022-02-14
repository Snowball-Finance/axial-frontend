import React, { ReactElement } from "react";
import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import SocialLinks from "./SocialLink";
import { navigationRoutes } from "../constants";

export default function Sidebar(): ReactElement {
  const { t } = useTranslation();

  return (
    <StyledSidebar>
      <List>
        {navigationRoutes.map((nav) => (
          <ListItem key={nav.name}>
            <ListNavItem
              exact
              to={nav.to}
              activeStyle={{
                color: CssVariables.primary,
              }}
              isActive={(match, location) => {
                let pathStrings = location.pathname.split("/");

                if (match) {
                  return true;
                } else if (pathStrings[1] === nav.name) {
                  return true;
                } else {
                  return false;
                }
              }}
            >
              {t(translations.Navigation[nav.name]())}
            </ListNavItem>
          </ListItem>
        ))}
      </List>

      <SocialLinks />
    </StyledSidebar>
  );
}

const StyledSidebar = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "90vh",
  paddingLeft: "25%",
});

const List = styled("ul")({
  listStyleType: "none",
});

const ListItem = styled("li")({
  display: "block",
  paddingTop: 15,
  paddingBottom: 15,
});

const ListNavItem = styled(NavLink)({
  textDecoration: "none",
  color: CssVariables.white,
  fontWeight: "bold",
  fontSize: "42px",
  textTransform: "uppercase",
});

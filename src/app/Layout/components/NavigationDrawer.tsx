import React, { ReactElement, useState } from "react";
import { Drawer, Grid, styled } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { navigationRoutes } from "../constants";

export default function NavigationDrawer(): ReactElement {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <MenuIcon color="primary" fontSize="large" onClick={toggleDrawer} />
      <StyledDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        elevation={0}
      >
        <StyledContainer
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item alignSelf="end">
            <CloseIcon
              color="primary"
              fontSize="large"
              onClick={toggleDrawer}
            />
          </Grid>

          <Grid item>
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
                    onClick={toggleDrawer}
                  >
                    {t(translations.Navigation[nav.name]())}
                  </ListNavItem>
                </ListItem>
              ))}
            </List>
          </Grid>
        </StyledContainer>
      </StyledDrawer>
    </>
  );
}

const StyledDrawer = styled(Drawer)({
  "& .MuiPaper-root": {
    width: "100%",
    backgroundColor: CssVariables.navigationDrawerBackground,
  },
});

const StyledContainer = styled(Grid)({
  padding: 20,
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

const MenuIcon = styled(Menu)({
  border: "2px solid",
  borderRadius: "50%",
  padding: 2,
});

const CloseIcon = styled(Close)({
  border: "2px solid",
  borderRadius: "50%",
  padding: 2,
});

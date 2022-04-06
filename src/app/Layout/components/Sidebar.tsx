import React, { ReactElement, useEffect } from "react";
import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import SocialLinks from "./SocialLink";
import { navigationRoutes } from "../constants";

const clickPath = require("../../../assets/audio/click.mp3");
let ableToPlay = false;
const audio = new Audio(clickPath.default);
const playClick = () => {
  try {
    audio.play();
  } catch (e) {}
};

export default function Sidebar(): ReactElement {
  const { t } = useTranslation();
  const handleMenuItemMouseOver = () => {
    if (ableToPlay) {
      playClick();
    }
  };
  useEffect(() => {
    document.addEventListener("click", () => {
      ableToPlay = true;
    });

    return () => {};
  }, []);

  return (
    <StyledSidebar>
      <List>
        {navigationRoutes.map((nav) => (
          <ListItem key={nav.name}>
            <ListNavItem
              exact
              to={nav.to}
              onMouseOver={handleMenuItemMouseOver}
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
              <TestWrapper>
                <h1 data-heading={t(translations.Navigation[nav.name]())}>
                  {t(translations.Navigation[nav.name]())}
                </h1>
              </TestWrapper>
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
  minWidth: "355px",
  ".active": {
    h1: {
      color: CssVariables.green,
    },
  },
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
const TestWrapper = styled("div")`
  --letterSpacingOnHover: 4px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  h1 {
    text-transform: uppercase;
    transform: translate(0px, 0px) skew(0deg, 0);
    margin: 0;
    font-size: 42px;
    font-weight: 400;
    white-space: nowrap;
    color: ${CssVariables.secondary};
    letter-spacing: 0;
    z-index: 1;
    transition: all 0.175s linear;
    &:hover {
      transform: translate(0px, 0px) skew(-5deg, 0);
      letter-spacing: var(--letterSpacingOnHover);
    }
  }
  /* h1::after, */
  h1::before {
    transition: all 0.1s linear;
    backface-visibility: hidden;
    content: attr(data-heading);
    position: absolute;
    letter-spacing: 0;
  }
  /* h1::after {
    left: 0px;
    top: 0px;
    z-index: 2;
    -webkit-text-stroke: 2px ${CssVariables.primary};
    -webkit-text-fill-color: transparent;
  } */
  h1::before {
    z-index: -1;
    left: 0px;
    top: 0px;
    color: #f68722;
  }
  /* h1:hover::after {
    left: -2px;
    top: -2px;
  } */
  h1:hover::before {
    left: 4px;
    top: 4px;
    letter-spacing: var(--letterSpacingOnHover);
  }
`;

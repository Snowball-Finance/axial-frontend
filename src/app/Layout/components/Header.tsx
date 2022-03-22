import React, { ReactElement } from "react";
import { styled } from "@mui/material";
import { isMobile } from "react-device-detect";

import LogoIcon from "../../../assets/images/logo.svg";
import { WalletToggle } from "app/components/common/walletToggle";
import NavigationDrawer from "./NavigationDrawer";

export default function Header(): ReactElement {
  return (
    <StyledHeader>
      <Logo src={LogoIcon} alt="logo" />

      {isMobile ? (
        <MobileWrapper>
          <WalletToggle />
          <NavigationDrawer />
        </MobileWrapper>
      ) : (
        <WalletToggle />
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled("header")(({ theme }) => ({
  height: 88,
  paddingLeft: 56,
  paddingRight: 56,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    columnGap: 20,
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: 190,

  [theme.breakpoints.down("sm")]: {
    width: 100,
  },
}));

const MobileWrapper = styled("div")({
  display: "flex",
  columnGap: 10,
  alignItems: "center",
});

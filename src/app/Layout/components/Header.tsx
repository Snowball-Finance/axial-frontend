import React, { ReactElement } from "react";
import { styled } from "@mui/material";

import { WalletToggle } from "app/components/common/walletToggle";
import NavigationDrawer from "./NavigationDrawer";
import { mobile } from "styles/media";
import { useDeviceSize } from "hooks/mediaQuery";
import { AnimatedLogo } from "../animatedLogo";
import { AxialLogoText } from "./axialLogoText";

export default function Header(): ReactElement {
  const { isMobile } = useDeviceSize();
  return (
    <StyledHeader>
      {/* <Logo src={LogoIcon} alt="logo" /> */}
      <LogoWrapper>
        <StyledAnimateLogo />
        <AxialLogoText />
      </LogoWrapper>

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
const LogoWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
});
const StyledAnimateLogo = styled(AnimatedLogo)({
  maxWidth: "125px",
  minWidth: "125px",
  marginRight: "-10px",
  [mobile]: {
    maxWidth: "75px",
    minWidth: "75px",
    marginRight: "0",
  },
});

const StyledHeader = styled("header")(({ theme }) => ({
  height: 88,
  paddingLeft: 56,
  paddingRight: 56,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  [mobile]: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    columnGap: 20,
  },
}));

const MobileWrapper = styled("div")({
  display: "flex",
  columnGap: 10,
  alignItems: "center",
});

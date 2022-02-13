import React, { ReactElement } from "react";
import { styled } from "@mui/material";

import LogoIcon from "../../../assets/images/logo.svg";
import { WalletToggle } from "../../components/common/wallettoggle";

export default function Header(): ReactElement {
  return (
    <StyledHeader>
      <Logo src={LogoIcon} alt="logo" />

      <WalletToggle />
    </StyledHeader>
  );
}

const StyledHeader = styled("header")({
  height: 88,
  paddingLeft: 56,
  paddingRight: 56,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Logo = styled("img")({
  width: 190,
});

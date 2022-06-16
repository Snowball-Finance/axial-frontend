import React, { ReactElement } from "react";
import { styled } from "@mui/material";
import { isMobile } from "react-device-detect";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { mobile } from "styles/media";
import { Background } from "./background";

export default function Layout({
  children,
}: React.PropsWithChildren<unknown>): ReactElement {
  return (
    <StyledLayout>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      {!isMobile && (
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
      )}

      <MainWrapper>{children}</MainWrapper>
      <Background />
    </StyledLayout>
  );
}

const StyledLayout = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  [mobile]: {
    width: "100%",
    overflowX: "hidden",
  },
}));

const HeaderWrapper = styled("div")({
  position: "fixed",
  width: "100%",
  zIndex: 1,
});

const SidebarWrapper = styled("div")({
  position: "fixed",
  width: "20%",
  marginTop: 100,
  minHeight: "90vh",
});

const MainWrapper = styled("div")(({ theme }) => ({
  marginTop: 100,
  marginBottom: 50,
  marginLeft: "25%",

  [mobile]: {
    marginLeft: 0,
    padding: "0 5px",
  },
}));

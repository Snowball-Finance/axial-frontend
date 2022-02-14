import React, { ReactElement } from "react";
import { styled } from "@mui/material";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Layout({
  children,
}: React.PropsWithChildren<unknown>): ReactElement {
  return (
    <StyledLayout>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      <MainWrapper>{children}</MainWrapper>
    </StyledLayout>
  );
}

const StyledLayout = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

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

const MainWrapper = styled("div")({
  marginTop: 100,
  marginLeft: "20%",
});

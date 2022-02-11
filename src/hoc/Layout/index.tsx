import React, { ReactElement } from "react"
import TopMenu from "../../components/menu/TopMenu"
import { useLocation } from "react-router"
import "./index.scss"
import Navigation from "../../components/navigation/Navigation"

export default function Layout({
  children,
}: React.PropsWithChildren<unknown>): ReactElement {
  const { pathname }: { pathname: string } = useLocation()
  const activeTab = pathname.split("/")[1] || "swap"

  return (
    <div className="layout">
      <div className="topbar">
        <TopMenu />
      </div>

      <div className="sidebar">
        <Navigation activeTab={activeTab} />
      </div>

      <div className="mainContainer">{children}</div>
    </div>
  )
}

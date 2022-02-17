import React, { ReactElement } from "react"
import TopMenu from "../../components/menu/TopMenu"
import Footer from "../../components/footer/Footer"
import { useLocation } from "react-router"
import "./index.scss"

export default function Layout({ children }: React.PropsWithChildren<unknown>): ReactElement {
  const { pathname }: { pathname: string } = useLocation()
  const activeTab = pathname.split("/")[1] || "swap"

  return (
    <div className="layout">
      <TopMenu activeTab={activeTab} />
      {children}
      <Footer />
    </div>
  )
}

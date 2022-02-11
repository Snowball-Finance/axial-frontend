import styles from "./Navigation.module.scss"

import React, { ReactElement } from "react"

import { Link } from "react-router-dom"
import classNames from "classnames"
import { useTranslation } from "react-i18next"

interface Props {
  activeTab: string
}

type Navigation = {
  name: string
  to: string
  activeForTabs: string[]
}

type SocialLinks = {
  icon: string
  href: string
}

const navigationRoutes: Navigation[] = [
  {
    name: "swap",
    to: "/",
    activeForTabs: ["swap"],
  },
  {
    name: "liquidity",
    to: "/pools",
    activeForTabs: ["pools", "deposit", "withdraw"],
  },
  {
    name: "rewards",
    to: "/rewards",
    activeForTabs: ["rewards"],
  },
  {
    name: "risk",
    to: "/risk",
    activeForTabs: ["risk"],
  }
]

const socialLinks: SocialLinks[] = [
  {
    icon: "docs",
    href: "https://docs.axial.exchange",
  },
  {
    icon: "discord",
    href: "https://discord.gg/NPsxMhcCrS",
  },
  {
    icon: "github",
    href: "https://github.com/Snowball-Finance",
  },
  {
    icon: "twitter",
    href: "https://twitter.com/AxialDeFi",
  },
  {
    icon: "telegram",
    href: "https://t.me/axialdefi",
  },
  {
    icon: "medium",
    href: "https://medium.com/@AxialDeFi",
  },
]

function Navigation({ activeTab }: Props): ReactElement {
  const { t } = useTranslation()

  return (
    <div className={styles.navigation}>
      <ul className={styles.nav}>
        {navigationRoutes.map((nav) => (
          <li key={nav.name}>
            <Link
              to={nav.to}
              className={classNames({
                [styles.active]: nav.activeForTabs.includes(activeTab),
              })}
            >
              {t(nav.name)}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.socialLinks}>
        {socialLinks.map((linkItem, index) => (
          <a key={index} href={linkItem.href} target="_blank" rel="noreferrer">
            <img src={`/icons/${linkItem.icon}_white.svg`} alt={linkItem.icon} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default Navigation

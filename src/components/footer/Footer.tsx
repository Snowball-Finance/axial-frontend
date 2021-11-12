import React, { ReactElement } from "react"
import Version from "../../components/version/Version"
import styles from './Footer.module.scss'

const socialLinks = [
  {
    icon: 'docs',
    href: 'https://docs.axial.exchange',
  },
  {
    icon: 'discord',
    href: 'https://discord.gg/NPsxMhcCrS',
  },
  {
    icon: 'github',
    href: 'https://github.com/Snowball-Finance',
  },
  {
    icon: 'twitter',
    href: 'https://twitter.com/AxialDeFi',
  },
  {
    icon: 'telegram',
    href: 'https://t.me/axialdefi',
  },
  {
    icon: 'medium',
    href: 'https://medium.com/@AxialDeFi',
  },
]

export default function Footer(): ReactElement {
  return (
    <footer className={styles.socialLinks}>
      <Version />
      {socialLinks.map(
        (linkItem, index) => (
          <a key={index} href={linkItem.href} target="_blank" rel="noreferrer">
            <img src={`/icons/${linkItem.icon}.svg`} alt={linkItem.icon} />
          </a>
        )
      )}
    </footer>
  );
}
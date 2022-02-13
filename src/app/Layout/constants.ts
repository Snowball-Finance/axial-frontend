import { AppPages, NavigationRouteName } from "app/types";
import { Navigation, Social } from "./types";
import docsIcon from "../../assets/images/social/docs.svg";
import discordIcon from "../../assets/images/social/discord.svg";
import githubIcon from "../../assets/images/social/github.svg";
import twitterIcon from "../../assets/images/social/twitter.svg";
import telegramIcon from "../../assets/images/social/telegram.svg";
import mediumIcon from "../../assets/images/social/medium.svg";

export const navigationRoutes: Navigation[] = [
  {
    name: NavigationRouteName.SWAP,
    to: AppPages.RootPage,
  },
  {
    name: NavigationRouteName.LIQUIDITY,
    to: AppPages.LiquidityPage,
  },
  {
    name: NavigationRouteName.REWARDS,
    to: AppPages.RewardPage,
  },
  {
    name: NavigationRouteName.STAKING,
    to: AppPages.StakingPage,
  },
  {
    name: NavigationRouteName.GOVERNANCE,
    to: AppPages.GovernancePage,
  },
  {
    name: NavigationRouteName.RISK,
    to: AppPages.RiskPage,
  },
];

export const socialLinks: Social[] = [
  {
    icon: "docs",
    href: "https://docs.axial.exchange",
    iconUrl: docsIcon,
  },
  {
    icon: "discord",
    href: "https://discord.gg/NPsxMhcCrS",
    iconUrl: discordIcon,
  },
  {
    icon: "github",
    href: "https://github.com/Snowball-Finance",
    iconUrl: githubIcon,
  },
  {
    icon: "twitter",
    href: "https://twitter.com/AxialDeFi",
    iconUrl: twitterIcon,
  },
  {
    icon: "telegram",
    href: "https://t.me/axialdefi",
    iconUrl: telegramIcon,
  },
  {
    icon: "medium",
    href: "https://medium.com/@AxialDeFi",
    iconUrl: mediumIcon,
  },
];

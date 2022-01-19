import MatomoTracker from "@datapunt/matomo-tracker-js"

export enum AnalyticCategories {
  investigation = "investigation",
  ui = "ui",
  link = "link",
  button = "button",
  modal = "modal",
  wallet = "wallet",
  error = "error",
  formSubmit = "formSubmit",
  clipboard = "clipboard",
}

export enum AnalyticActions {
  click = "click-event",
  wallet = "wallet",
  submit = "submit",
  approve = "approve",
  add = "add",
  copy = "copy",
  openOptions = "openOptions",
  remove = "remove",
}

interface CreateEventProps {
  category: AnalyticCategories
  action: AnalyticActions
  name?: string
  value?: number
  documentTitle?: string
  href?: string
}
export const createEvent = ({
  category,
  action,
  name,
  value,
  documentTitle,
  href,
}: CreateEventProps): {
  category: AnalyticCategories
  action: AnalyticActions
  name?: string // optional
  value?: number // optional, numerical value
  documentTitle?: string // optional
  href?: string
} => {
  return {
    category,
    action,
    name, // optional
    value, // optional, numerical value
    documentTitle, // optional
    href, // optional
  }
}
const urlBase = (() => {
  if (process.env.REACT_APP_ANALYTICS_ENDPOINT) {
    return process.env.REACT_APP_ANALYTICS_ENDPOINT
  }
  throw new Error(
    "No analytics endpoint defined in environment variables, please define REACT_APP_ANALYTICS_ENDPOINT",
  )
})()

const siteId = (() => {
  if (process.env.REACT_APP_ANALYTICS_SITE_ID) {
    return Number(process.env.REACT_APP_ANALYTICS_SITE_ID)
  }
  throw new Error(
    "No analytics site id defined in environment variables, please define REACT_APP_ANALYTICS_SITE_ID",
  )
})()

export const analytics = new MatomoTracker({
  urlBase,
  siteId,
})

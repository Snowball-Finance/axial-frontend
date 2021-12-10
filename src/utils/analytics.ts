import { createInstance, useMatomo } from '@datapunt/matomo-tracker-react'

export enum AnalyticCategories {
  investigation = 'investigation',
  ui = "ui",
  link = 'link',
  button = 'button',
  modal = 'modal',
  wallet = 'wallet',
  error = 'error',
  formSubmit = 'formSubmit',
  clipboard = 'clipboard',
}

export enum AnalyticActions {
  click = 'click-event',
  wallet = 'wallet',
  submit = 'submit',
  approve = 'approve',
  add = 'add',
  copy = 'copy',
  openOptions = 'openOptions',
  remove = 'remove',
}

interface CreateEventProps {
  category: AnalyticCategories,
  action: AnalyticActions,
  name?: string,
  value?: number,
  documentTitle?: string,
  href?: string,
}
export const createEvent = ({
  category,
  action,
  name,
  value,
  documentTitle,
  href,
}: CreateEventProps) => {
  return {
    category,
    action,
    name, // optional
    value, // optional, numerical value
    documentTitle, // optional
    href, // optional
  }
}

const urlBase = process.env.REACT_APP_ANALYTICS_ENDPOINT || 'notImplemented'

export const matomoInstance = createInstance({
  urlBase: urlBase,
  siteId: 2,
  trackerUrl: `${urlBase}matomo.php`, // optional, default value: `${urlBase}matomo.php`
  srcUrl: `${urlBase}matomo.js`, // optional, default value: `${urlBase}matomo.js`
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10 // optional, default value: `15
  },
  linkTracking: false, // optional, default value: true
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    disableCookies: false,
    setSecureCookie: process.env.ENVIRONMENT === 'PROD',
    setRequestMethod: 'POST'
  }
})

export const useAnalytics = () => {
  const { trackPageView, trackEvent } = useMatomo()
  return { trackPageView, trackEvent }
}


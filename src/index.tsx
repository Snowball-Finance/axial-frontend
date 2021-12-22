/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import * as serviceWorker from 'serviceWorker';
import 'sanitize.css/sanitize.css';
import { history } from 'router/history';
// Initialize languages
import './locales/i18n';

import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';

import { ThemeProvider as MaterialThemeProvider } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { theme } from "styles/theme";
import { Web3ReactProvider } from "@web3-react/core";
import { provider } from 'web3-core';

import Web3 from "web3";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "services/apollo/client";
import { ConnectedRouter } from "connected-react-router";
// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const store = configureAppStore({}, history);
const MOUNT_NODE = document.getElementById('Skeleton') as HTMLElement;
interface Props {
  Component: typeof App;
}

toast.configure({
  autoClose: 6000,
  draggable: true,
  pauseOnHover: true,
  rtl: false,
  // transition: Slide,
  position: 'top-right',
  // hideProgressBar: true,
});

const getLibrary = (provider: provider) => {
  return new Web3(provider);
}


const ConnectedApp = ({ Component }: Props) => (
  <ReduxProvider store={store}>
    <ApolloProvider client={apolloClient}>
      <Web3ReactProvider {...{ getLibrary }}>
        <MaterialThemeProvider theme={theme}>
          <HelmetProvider>
            <ConnectedRouter history={history}>
              <Component />
            </ConnectedRouter>
          </HelmetProvider>
        </MaterialThemeProvider>
      </Web3ReactProvider>
    </ApolloProvider>
  </ReduxProvider>

);

const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./app', './locales/i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    const App = require('./app').App;
    render(App);
  });
}

render(App);

// make it pwa
serviceWorker.register();

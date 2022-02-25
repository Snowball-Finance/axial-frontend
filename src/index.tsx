import "./index.css"
import "./i18n"

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { Web3ReactProvider, createWeb3ReactRoot } from "@web3-react/core"
import { ApolloProvider } from '@apollo/client';
import { logError, sendWebVitalsToGA } from "./libs/googleAnalytics"

import App from "./pages/App"
import { NetworkContextName } from "./constants"
import { Provider } from "react-redux"
import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router } from "react-router-dom"
import chakraTheme from "./theme/"
import getLibrary from "./libs/getLibrary"
import { getNetworkLibrary } from "./connectors"
import reportWebVitals from "./reportWebVitals"
import store from "./store"
import { apolloClient } from "./libs/apollo";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (window && window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

window.addEventListener("error", logError)

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />
    <React.StrictMode>
      <ChakraProvider theme={chakraTheme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getNetworkLibrary}>
            <ApolloProvider client={apolloClient}>
              <Provider store={store}>
                <Router>
                  <App />
                </Router>
              </Provider>
            </ApolloProvider>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </ChakraProvider>
    </React.StrictMode>
  </>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendWebVitalsToGA)

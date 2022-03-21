import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "../../utils/wallet/connectors";

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 * @param {boolean} suppress Suppress useEffect behaviour
 */
export function useInactiveListener(suppress = false): void {
  const { active, error, activate } = useWeb3React(); // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = (): void => {
        // eat errors
        activate(injected, undefined, true).catch((error) => {
          console.error("Failed to activate after chain changed", error);
        });
      };

      const handleAccountsChanged = (accounts: string[]): void => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((error) => {
            console.error("Failed to activate after accounts changed", error);
          });
        }
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return (): void => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
}

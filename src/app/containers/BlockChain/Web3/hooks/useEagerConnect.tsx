import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { gnosisSafe, injected } from "../../utils/wallet/connectors";
import { isMobile } from "react-device-detect";
import { GnosisSafeSelectors } from "app/containers/GnosisSafe/selectors";
import { useSelector } from "react-redux";

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React(); // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false);
  const connectedToGnosis = useSelector(GnosisSafeSelectors.connected);

  useEffect(() => {
    const connector = connectedToGnosis ? gnosisSafe : injected;

    void (
      connectedToGnosis ? gnosisSafe.isSafeApp() : injected.isAuthorized()
    ).then((isAuthorized) => {
      if (isAuthorized) {
        activate(connector, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        if (isMobile && window.ethereum) {
          activate(connector, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      }
    });
  }, [activate, connectedToGnosis]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

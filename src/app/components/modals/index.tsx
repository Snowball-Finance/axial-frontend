import { NoProviderAlert } from "./noProvider";
import { TokenInQueueToApprove } from "./tokensInQueueToApprove";
import { WrongNetworkModalAlert } from "./wrongNetwork";

export const GlobalModals = () => {
  return (
    <>
      <WrongNetworkModalAlert />
      <NoProviderAlert />
      <TokenInQueueToApprove />
    </>
  );
};

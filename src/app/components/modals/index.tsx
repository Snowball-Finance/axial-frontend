import { NoProviderAlert } from "./noProvider";
import { WrongNetworkModalAlert } from "./wrongNetwork";

export const GlobalModals = () => {
  return (
    <>
      <WrongNetworkModalAlert />
      <NoProviderAlert />
    </>
  );
};

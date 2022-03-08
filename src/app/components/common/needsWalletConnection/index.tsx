import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";

interface NeedsWalletConnectionProps {
  connected: ReactNode;
  disConnected: ReactNode;
}

export const NeedsWalletConnection: FC<NeedsWalletConnectionProps> = ({
  connected,
  disConnected,
}) => {
  const account = useSelector(Web3Selectors.selectAccount);
  if (account) {
    return <>{connected}</>;
  }
  return <>{disConnected}</>;
};

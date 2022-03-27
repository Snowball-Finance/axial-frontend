import { globalSelectors } from "app/appSelectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import { SnowModal } from "../common/modal";

export const TokenInQueueToApprove: FC = () => {
  const tokensInQueue = useSelector(globalSelectors.tokensInQueueToApprove);
  const open = Object.keys(tokensInQueue).length > 0;
  return (
    <SnowModal isOpen={open}>
      {
        <ul>
          {Object.keys(tokensInQueue).map((tokenSymbol) => {
            return (
              <li style={{ color: "white" }} key={tokenSymbol}>
                {tokenSymbol}
                {tokensInQueue[tokenSymbol].toString()}{" "}
              </li>
            );
          })}
        </ul>
      }
    </SnowModal>
  );
};

import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { BNToFloat } from "common/format";
import { BigNumber } from "ethers";
import { useSelector } from "react-redux";

export const VeAxialInfo = () => {
  const rawBalance = useSelector(GovernanceSelectors.accruingTokenBalance);
  const rawStaked = useSelector(
    GovernanceSelectors.mainTokenAmountStakedForAccruing
  );
  const balance = BNToFloat(rawBalance ?? BigNumber.from(0), 18)?.toFixed(3);
  const staked = BNToFloat(rawStaked ?? BigNumber.from(0), 18)?.toFixed(3);
  return (
    <>
      <p style={{ color: "white" }}>veAxial balance: {balance?.toString()}</p>
      <p style={{ color: "white" }}>staked Axial: {staked?.toString()}</p>
    </>
  );
};

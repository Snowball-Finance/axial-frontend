import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { BNToFractionString } from "common/format";
import { useSelector } from "react-redux";

export const VeAxialInfo = () => {
  const rawBalance = useSelector(GovernanceSelectors.accruingTokenBalance);
  const rawStaked = useSelector(
    GovernanceSelectors.mainTokenAmountStakedForAccruing
  );
  const balance = BNToFractionString(rawBalance);
  const staked = BNToFractionString(rawStaked);
  return (
    <>
      <p style={{ color: "white" }}>veAxial balance: {balance?.toString()}</p>
      <p style={{ color: "white" }}>staked Axial: {staked?.toString()}</p>
    </>
  );
};

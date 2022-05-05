import { styled } from "@mui/material";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const AllocationInput = ({ data }: { data: GaugeItem }) => {
  const gauge = useSelector(
    GovernancePageSelectors.selectedVoteAllocationPair(data.address)
  );
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let v = value;
    if (v === "") {
      v = "0";
    } else if (value.includes("e") || Number(value) < 0) {
      return;
    }

    const newGauge = { ...gauge, enteredAllocation: v ? Number(v) : 0 };
    dispatch(
      GovernancePageActions.setSelectedPairAllocationInputValue(newGauge)
    );
  };
  let v = gauge?.enteredAllocation + "" ?? "";
  if (!isNaN(Number(v))) {
    if (v.length > 1 && v.charAt(0) === "0" && v.charAt(1) !== ".") {
      v = v.substring(1);
    }
  }

  return (
    <Wrapper>
      <input type="number" value={v} onChange={handleInputChange} />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  input: {
    maxWidth: "100px",
    height: "30px",
    outline: "none",
    borderRadius: "8px",
    border: `1px solid ${CssVariables.gridInputBorder}`,
    padding: "0px 5px",
  },
});

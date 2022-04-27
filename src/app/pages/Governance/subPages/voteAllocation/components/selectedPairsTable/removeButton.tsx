import { styled } from "@mui/material";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { CrossInCircle } from "assets/images/iconComponents/crossInCircle";
import { useDispatch } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const RemoveButton = ({ data }: { data: GaugeItem }) => {
  const dispatch = useDispatch();
  const handleRemoveClick = () => {
    dispatch(GovernancePageActions.toggleSelectedPair(data));
  };

  return (
    <Wrapper onClick={handleRemoveClick}>
      <CrossInCircle color={CssVariables.primary} />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  width: "24px",
  height: "24px",
  cursor: "pointer",
});

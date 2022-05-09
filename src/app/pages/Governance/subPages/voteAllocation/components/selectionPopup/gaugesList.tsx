import { Checkbox, styled } from "@mui/material";
import { PoolsAndGaugesSelectors } from "app/containers/PoolsAndGauges/selectors";

import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const GaugesListToSelectFrom = () => {
  const dispatch = useDispatch();
  const gauges = useSelector(PoolsAndGaugesSelectors.gauges);
  const selectedGauges = useSelector(
    GovernancePageSelectors.selectedVoteAllocationGaugesObj
  );
  const handleGaugeClick = (gauge: GaugeItem) => {
    dispatch(GovernancePageActions.toggleSelectedGauge(gauge));
  };

  return (
    <Wrapper>
      {gauges.map((gauge: GaugeItem) => {
        return (
          <ItemWrapper
            onClick={() => {
              handleGaugeClick(gauge);
            }}
            key={gauge.address}
          >
            <span>
              <Checkbox
                checked={Object.keys(selectedGauges).includes(gauge.address)}
                size="medium"
              />
            </span>
            <span>{gauge.poolName}</span>
          </ItemWrapper>
        );
      })}
    </Wrapper>
  );
};

const ItemWrapper = styled("div")({
  color: CssVariables.commonTextColor,
  fontSize: "14px",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

const Wrapper = styled("div")({
  maxHeight: "330px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

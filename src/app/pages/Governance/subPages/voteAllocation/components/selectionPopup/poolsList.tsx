import { Checkbox, styled } from "@mui/material";
import { PoolsAndGaugesSelectors } from "app/containers/PoolsAndGauges/selectors";

import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const PoolsList = () => {
  const dispatch = useDispatch();
  const pools = useSelector(PoolsAndGaugesSelectors.poolsArray);
  const selectedGauges = useSelector(
    GovernancePageSelectors.selectedVoteAllocationPairsObj
  );
  const handleGaugeClick = (gauge: GaugeItem) => {
    dispatch(GovernancePageActions.toggleSelectedGauge(gauge));
  };

  return (
    <Wrapper>
      {pools.map((pool) => {
        return (
          <ItemWrapper
            onClick={() => {
              handleGaugeClick(pool.gauge as GaugeItem);
            }}
            key={pool.tokenaddress}
          >
            <span>
              <Checkbox
                checked={Object.keys(selectedGauges).includes(
                  pool.gauge_address
                )}
                size="medium"
              />
            </span>
            <span>{pool.symbol}</span>
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

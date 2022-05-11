import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, styled, TextField, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { GovernancePageActions } from "app/pages/Governance/slice";

interface Props {
  data: GaugeItem;
}

export const AllocationInput: FC<Props> = ({ data }) => {
  const gauge = useSelector(
    GovernancePageSelectors.selectedVoteAllocationPair(data.address)
  );
  const selectedGauges = useSelector(
    GovernancePageSelectors.selectedVoteAllocationGaugesObj
  );

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let gaugeInputValue = value;
    if (gaugeInputValue === "") {
      gaugeInputValue = "0";
    } else if (value.includes("e") || Number(value) < 0) {
      return;
    }

    const newGauge = {
      ...gauge,
      enteredAllocation: gaugeInputValue ? Number(gaugeInputValue) : 0,
    };
    dispatch(
      GovernancePageActions.setSelectedPairAllocationInputValue(newGauge)
    );
  };

  let gaugeInputValue = gauge?.enteredAllocation + "" ?? "";

  if (!isNaN(Number(gaugeInputValue))) {
    if (
      gaugeInputValue.length > 1 &&
      gaugeInputValue.charAt(0) === "0" &&
      gaugeInputValue.charAt(1) !== "."
    ) {
      gaugeInputValue = gaugeInputValue.substring(1);
    }
  }

  return (
    <Grid container alignItems="center" spacing={1} justifyContent="center">
      <Grid item>
        <InputField
          value={gaugeInputValue}
          onChange={handleInputChange}
          disabled={!Object.keys(selectedGauges).includes(gauge?.address)}
        />
      </Grid>

      <Grid item>
        <PercentageText variant="body1">%</PercentageText>
      </Grid>
    </Grid>
  );
};

const PercentageText = styled(Typography)({
  color: CssVariables.green,
});

const InputField = styled(TextField)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    width: 60,
    height: 30,
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${CssVariables.green} !important`,
    borderRadius: CssVariables.buttonBorderRadius,
  },
});

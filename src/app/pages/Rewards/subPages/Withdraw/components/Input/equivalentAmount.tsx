import { styled, Typography } from "@mui/material";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const EquivalentInUsdt = () => {
  let value = useSelector(RewardsPageSelectors.equivalentWithdrawAmount);
  if (!value || isNaN(Number(value))) {
    value = 0;
  }
  let equivalentValueToShow = value === 0 ? "$0" : `~ < $0.01`;
  if (value > 0.01) {
    equivalentValueToShow = `~ $${value.toFixed(2)}`;
  }

  return <InputText variant="body2" align="right">{equivalentValueToShow}</InputText>;
};

const InputText = styled(Typography)({
  color: CssVariables.white,
});

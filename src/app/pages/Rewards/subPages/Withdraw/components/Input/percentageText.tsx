import { styled, Typography } from "@mui/material";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Percentage = () => {
  const percentage = useSelector(RewardsPageSelectors.withdrawPercentage);
  return (
    <PercentageText variant="body2">{percentage.toString()}</PercentageText>
  );
};

const PercentageText = styled(Typography)({
  color: CssVariables.white,
});

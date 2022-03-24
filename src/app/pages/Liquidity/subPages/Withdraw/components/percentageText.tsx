import { styled } from "@mui/material";
import { SnowInput } from "app/components/base/SnowInput";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const PercentageText = () => {
  const selectedPercentage = useSelector(
    LiquidityPageSelectors.withdrawPercentage
  );
  return (
    <InputField value={selectedPercentage.toString()} onChange={() => {}} />
  );
};

const InputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    height: 40,
  },

  ".MuiInputBase-input": {
    textAlign: "right",
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

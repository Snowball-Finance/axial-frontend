import { styled } from "@mui/material";
import { SnowInput } from "app/components/base/SnowInput";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const RewardsDepositInput = () => {
  const dispatch = useDispatch();
  const value = useSelector(RewardsPageSelectors.depositValue);
  const handleInputChange = (e: string) => {
    dispatch(RewardsPageActions.setDepositValue(e));
  };
  return <CurrencyInputField value={value} onChange={handleInputChange} />;
};

const CurrencyInputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
  },

  ".MuiInputBase-input": {
    textAlign: "end",
    padding: 0,
    fontSize: "26px",
    align: "right",
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

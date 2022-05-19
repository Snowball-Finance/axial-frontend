import { styled } from "@mui/material";
import { SnowInput } from "app/components/base/SnowInput";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const WithdrawInput = () => {
  const dispatch = useDispatch();
  const value = useSelector(RewardsPageSelectors.withdrawAmount);

  const handleInputChange = (e: string) => {
    if (isNaN(Number(e))) {
      return;
    }
    dispatch(RewardsPageActions.setWithdrawAmount(e));
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
    align: "end",
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

import { styled } from "@mui/material";
import { SnowInput } from "app/components/base/SnowInput";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import { zeroString } from "app/pages/Liquidity/constants";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const WithdrawInput = ({ token }: { token: Token }) => {
  const dispatch = useDispatch();
  const value =
    useSelector(LiquidityPageSelectors.withdrawAmount(token.symbol)) ||
    zeroString;
  const handleInputChange = (e: string) => {
    dispatch(
      LiquidityPageActions.setAmountForTokenToWithdraw({
        symbol: token.symbol as TokenSymbols,
        value: e,
      })
    );
  };
  return <CurrencyInputField value={value} onChange={handleInputChange} />;
};

const CurrencyInputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "26px",
  },

  ".MuiOutlinedInput-input": {
    padding: 0,
    textAlign: "right",
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

import { styled } from "@mui/material";
import { SnowInput } from "app/components/base/SnowInput";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const WithdrawInput = ({ token }: { token: Token }) => {
  const dispatch = useDispatch();
  const value =
    useSelector(LiquidityPageSelectors.withdrawTokenToShow(token.symbol)) || "";
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
    fontSize: "16px",
    width: 80,
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

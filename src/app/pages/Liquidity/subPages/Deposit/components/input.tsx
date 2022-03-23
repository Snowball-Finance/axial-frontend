import { styled } from "@mui/material";
import { SnowInput } from "app/components/base/SnowInput";
import { TokenSymbols } from "app/containers/Swap/types";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const LiquidityDepositInput = memo(
  ({ tokenSymbol }: { tokenSymbol: TokenSymbols }) => {
    const dispatch = useDispatch();
    const value =
      useSelector(
        LiquidityPageSelectors.liquidityDepositTokenAmount(tokenSymbol)
      ) || "0.0";

    const handleInputChange = (e: string) => {
      dispatch(
        LiquidityPageActions.setLiquidityDepositTokenAmount({
          symbol: tokenSymbol,
          value: e,
        })
      );
    };

    return <CurrencyInputField value={value} onChange={handleInputChange} />;
  },
  () => true
);

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

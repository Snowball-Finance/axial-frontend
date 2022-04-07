import React, { FC, memo } from "react";
import {
  styled,
  Grid,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowRadio } from "app/components/base/SnowRadio";
import { getKeyFromPoolIndex } from "app/pages/Liquidity/constants";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { TypeOfTokensToWithdraw } from "app/pages/Liquidity/types";

type TParams = { poolIndex: string };

export const Selection: FC = memo(
  () => {
    const dispatch = useDispatch();
    const { poolIndex } = useParams<TParams>();
    const poolKey = getKeyFromPoolIndex(poolIndex) || "";
    const poolTokens = useSelector(
      LiquidityPageSelectors.liquidityPoolTokens(poolKey)
    );
    const selectedToken = useSelector(
      LiquidityPageSelectors.selectedTokenToWithdraw
    );
    const setSelectedTokenToWithdraw = (
      e: TypeOfTokensToWithdraw.Combo | TokenSymbols
    ) => {
      dispatch(
        LiquidityPageActions.setSelectedTokenToWithdraw({
          symbol: e as TokenSymbols,
          shouldEffectInputs: true,
        })
      );
    };
    return (
      <Grid item>
        <StyledWithdrawOption>
          <StyledRadioGroup row>
            <FormControlLabel
              onClick={() =>
                setSelectedTokenToWithdraw(TypeOfTokensToWithdraw.Combo)
              }
              control={
                <SnowRadio
                  checked={selectedToken === TypeOfTokensToWithdraw.Combo}
                />
              }
              label="Combo"
            />
            {poolTokens.map((token: Token) => (
              <FormControlLabel
                key={token.address}
                onClick={() =>
                  setSelectedTokenToWithdraw(token.symbol as TokenSymbols)
                }
                control={<SnowRadio checked={selectedToken === token.symbol} />}
                label={token.symbol}
              />
            ))}
          </StyledRadioGroup>
        </StyledWithdrawOption>
      </Grid>
    );
  },
  () => true
);

const StyledWithdrawOption = styled(FormControl)({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "5px 20px",
  color: CssVariables.white,
});

const StyledRadioGroup = styled(RadioGroup)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  color: CssVariables.white,
});

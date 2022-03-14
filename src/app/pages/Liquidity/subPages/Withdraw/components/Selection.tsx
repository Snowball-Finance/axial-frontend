import React, { FC } from "react";
import {
  styled,
  Grid,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowRadio } from "app/components/base/SnowRadio";
import { getKeyFromPoolIndex } from "app/pages/Liquidity/constants";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { Token } from "app/containers/Swap/types";

type TParams = { poolIndex: string };

export const Selection: FC = () => {
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const poolTokens = useSelector(
    LiquidityPageSelectors.liquidityPoolTokens(poolKey)
  );

  return (
    <Grid item>
      <StyledWithdrawOption>
        <StyledRadioGroup row>
          <FormControlLabel
            value="combo"
            control={<SnowRadio />}
            label="Combo"
          />
          {poolTokens.map((pool: Token) => (
            <FormControlLabel
              key={pool.address}
              value={pool.symbol}
              control={<SnowRadio />}
              label={pool.symbol}
            />
          ))}
        </StyledRadioGroup>
      </StyledWithdrawOption>
    </Grid>
  );
};

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

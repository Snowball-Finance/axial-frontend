import React, { FC } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { SwapPageSelectors } from "../../../selectors";
import { SwapPageActions } from "../../../slice";
import { TokenSearch } from "../../TokenSearch";

export const ToTokenSearch: FC = () => {
  const toTokenOptions = useSelector(SwapPageSelectors.toTokenOptions);
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const dispatch = useDispatch();

  const handleTokenChange = (tokenSymbol: string) => {
    dispatch(SwapPageActions.tokenChange({ isFromToken: false, tokenSymbol }));
  };

  const handleSearch = (value: string) => {
    dispatch(SwapPageActions.setSearchValue(value));
  };

  return (
    <Grid item xs={6}>
      <TokenSearch
        options={toTokenOptions}
        selectedValue={selectedToToken}
        tokenChange={handleTokenChange}
        handleSearch={handleSearch}
      />
    </Grid>
  );
};

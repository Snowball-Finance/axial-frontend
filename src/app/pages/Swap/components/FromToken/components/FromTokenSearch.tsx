import React, { FC } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { SwapPageSelectors } from "../../../selectors";
import { SwapPageActions } from "../../../slice";
import { TokenSearch } from "../../TokenSearch";

export const FromTokenSearch: FC = () => {
  const fromTokenOptions = useSelector(SwapPageSelectors.fromTokenOptions);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const dispatch = useDispatch();

  const handleTokenChange = (tokenSymbol: string) => {
    dispatch(SwapPageActions.tokenChange({ isFromToken: true, tokenSymbol }));
  };

  const handleSearch = (value: string) => {
    dispatch(SwapPageActions.setSearchValue(value));
  };

  return (
    <Grid item xs={6}>
      <TokenSearch
        options={fromTokenOptions}
        selectedValue={selectedFromToken}
        tokenChange={handleTokenChange}
        handleSearch={handleSearch}
      />
    </Grid>
  );
};

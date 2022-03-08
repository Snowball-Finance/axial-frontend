import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber } from "ethers";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { TextButton } from "app/components/common/buttons/textButton";
import { SnowInput } from "app/components/base/SnowInput";
import { SwapPageSelectors } from "../selectors";
import { SwapPageActions } from "../slice";
import { BNToString } from "common/format";
import { TokenSearch } from "./TokenSearch";

export const FromToken: FC = () => {
  const { t } = useTranslation();
  const fromTokenOptions = useSelector(SwapPageSelectors.fromTokenOptions);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const selectedFromAmount = useSelector(SwapPageSelectors.selectedFromAmount);
  const dispatch = useDispatch();

  const handleTokenChange = (tokenSymbol: string) => {
    dispatch(SwapPageActions.tokenChange({ isFromToken: true, tokenSymbol }));
  };

  const handleInputChange = (value: string) => {
    dispatch(SwapPageActions.amountChange(value));
  };

  const handleMaxAmountSelection = () => {
    dispatch(SwapPageActions.maxAmountSelection());
  };

  const handleSearch = (value: string) => {
    dispatch(SwapPageActions.setSearchValue(value));
  };

  return (
    <StyledContainerItem item xs={12}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <HeaderText variant="h5">
                {t(translations.SwapPage.FromToken.From())}
              </HeaderText>
            </Grid>

            <Grid item>
              <MaxText onClick={handleMaxAmountSelection}>
                {t(translations.SwapPage.FromToken.Max())}
              </MaxText>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <StyledCurrencyInput>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <CurrencyInputField
                  value={selectedFromAmount}
                  onChange={handleInputChange}
                  placeHolder="0.00"
                />
              </Grid>

              <Grid item xs={6}>
                <TokenSearch
                  options={fromTokenOptions}
                  selectedValue={selectedFromToken}
                  tokenChange={handleTokenChange}
                  handleSearch={handleSearch}
                />
              </Grid>
            </Grid>
          </StyledCurrencyInput>
        </Grid>

        <Grid item>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <BalanceText>
                {t(translations.SwapPage.FromToken.WalletBalance())}{" "}
                {BNToString(
                  selectedFromToken?.balance ?? BigNumber.from(0),
                  selectedFromToken?.decimals
                )}
              </BalanceText>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledContainerItem>
  );
};

const StyledContainerItem = styled(Grid)({
  width: "100%",
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
});

const MaxText = styled(TextButton)({
  fontSize: "1.5rem",
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});

const StyledCurrencyInput = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: 10,
});

const CurrencyInputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "20px",
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

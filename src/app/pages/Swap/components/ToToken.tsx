import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber } from "ethers";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { SwapPageSelectors } from "../selectors";
import { SwapPageActions } from "../slice";
import { BNToString } from "common/format";
import { TokenSearch } from "./TokenSearch";

export const ToToken: FC = () => {
  const { t } = useTranslation();
  const toTokenOptions = useSelector(SwapPageSelectors.toTokenOptions);
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const bestPath = useSelector(SwapSelectors.selectBestPath);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );
  const dispatch = useDispatch();

  const handleTokenChange = (tokenSymbol: string) => {
    dispatch(SwapPageActions.tokenChange({ isFromToken: false, tokenSymbol }));
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
                {t(translations.SwapPage.ToToken.To())}
              </HeaderText>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <StyledCurrencyInput>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <ToInputText variant="h6">
                  {isGettingBestSwapPath ? (
                    <ToTokenTextLoader width={100} />
                  ) : (
                    BNToString(
                      bestPath?.amounts[bestPath?.amounts.length - 1] ??
                        BigNumber.from(0),
                      selectedToToken?.decimals
                    )
                  )}
                </ToInputText>
              </Grid>

              <Grid item xs={6}>
                <TokenSearch
                  options={toTokenOptions}
                  selectedValue={selectedToToken}
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
                {t(translations.SwapPage.ToToken.WalletBalance())}{" "}
                {BNToString(
                  selectedToToken?.balance ?? BigNumber.from(0),
                  selectedToToken?.decimals
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

const ToInputText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "20px",
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});

const StyledCurrencyInput = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

const ToTokenTextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.poolCardBorder,
});

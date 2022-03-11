import React, { FC, useState } from "react";
import {
  styled,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SearchInput } from "app/components/base/searchInput";
import { Token } from "app/containers/Swap/types";
import { SwapPageSelectors } from "../selectors";
import { TokenOption } from "../types";

export interface Props {
  options: TokenOption[];
  selectedValue: Token | undefined;
  tokenChange: (v: string) => void;
  handleSearch: (v: string) => void;
}

export const TokenSearch: FC<Props> = ({
  options,
  selectedValue,
  tokenChange,
  handleSearch,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const searchValue = useSelector(SwapPageSelectors.searchValue);

  const handleTokenSelection = (tokenSymbol: string) => {
    tokenChange(tokenSymbol);
    setOpen(false);
  };

  const renderLabel = () => {
    if (selectedValue?.address) {
      return (
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TokenIcon
              src={selectedValue?.logo}
              alt={`token-${selectedValue.symbol}`}
            />
          </Grid>
          <Grid item>
            <TokenIconTitle variant="body2">
              {selectedValue.symbol}
            </TokenIconTitle>
          </Grid>
        </Grid>
      );
    }

    return (
      <Text variant="body2">
        {t(translations.SwapPage.TokenSearch.Placeholder())}
      </Text>
    );
  };

  return (
    <>
      <ButtonContainer onClick={() => setOpen(true)}>
        {renderLabel()}
        <SelectIcon />
      </ButtonContainer>

      {open && (
        <Dialog
          onClose={() => setOpen(false)}
          open={open}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>
            {t(translations.SwapPage.TokenSearch.SelectToken())}
          </DialogTitle>

          <DialogContent>
            <Grid container direction="column" spacing={2}>
              <SearchContainer item xs={12}>
                <SearchInput
                  value={searchValue}
                  onChange={handleSearch}
                  placeHolder={t(
                    translations.SwapPage.TokenSearch.Placeholder()
                  )}
                />
              </SearchContainer>

              <Grid item>
                <List>
                  {options?.map((item) => {
                    return (
                      <ListItemButton
                        key={item.value}
                        onClick={() => handleTokenSelection(item.value)}
                      >
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Grid container spacing={1} alignItems="center">
                              <Grid item>
                                <TokenIcon
                                  src={item.icon}
                                  alt={`token-${item.value}`}
                                />
                              </Grid>
                              <Grid item>
                                <Grid container direction="column">
                                  <Grid item>
                                    <TokenTitle variant="body2">
                                      {item.value}
                                    </TokenTitle>
                                  </Grid>
                                  <Grid item>
                                    <TokenSubTitle variant="caption">
                                      {item.label}
                                    </TokenSubTitle>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item>
                            <TokenSubTitle variant="caption">
                              {item.balance}
                            </TokenSubTitle>
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

const ButtonContainer = styled("div")({
  maxHeight: "45px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: CssVariables.buttonBorderRadius,
  border: `2px solid ${CssVariables.poolCardBorder}`,
  padding: 10,
  cursor: "pointer",
});

const SearchContainer = styled(Grid)({
  border: `2px solid ${CssVariables.poolCardBorder}`,
  borderRadius: CssVariables.buttonBorderRadius,
  padding: "0 !important",
  margin: 0,
  marginTop: 20,
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const TokenIconTitle = styled(Typography)({
  color: CssVariables.white,
});

const TokenTitle = styled(Typography)({});

const TokenSubTitle = styled(Typography)({});

const TokenIcon = styled("img")({
  width: "33px",
});

const SelectIcon = styled(KeyboardArrowDownIcon)({
  color: CssVariables.white,
});

import React, { FC, useState } from "react";
import { styled, Grid, List, ListItemButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SearchInput } from "app/components/base/searchInput";
import { Token } from "app/containers/Swap/types";
import { SwapPageSelectors } from "../selectors";
import { TokenOption } from "../types";
import { SnowModal } from "app/components/common/modal";
import { formatBNToString } from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";
import { mobile } from "styles/media";

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
      <Text variant="body2" noWrap>
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
        <SnowModal
          onClose={() => setOpen(false)}
          isOpen={open}
          title={`${t(translations.SwapPage.TokenSearch.SelectToken())}`}
        >
          <ModalContainer container>
            <SearchContainer item xs={12}>
              <SearchInput
                value={searchValue}
                onChange={handleSearch}
                placeHolder={t(translations.SwapPage.TokenSearch.Placeholder())}
              />
            </SearchContainer>

            <Grid item xs={12}>
              <TokensContainer>
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
                        <TokenIconContainer item>
                          <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Grid item>
                              <TokenIcon
                                src={item.icon}
                                alt={`token-${item.value}`}
                              />
                            </Grid>

                            <Grid item>
                              <TokenTitle variant="body2">
                                {item.value}
                              </TokenTitle>
                            </Grid>
                          </Grid>
                        </TokenIconContainer>

                        <Grid item xs zeroMinWidth>
                          <TokenTitle variant="body1" noWrap align="right">
                            {formatBNToString(
                              item.balance || Zero,
                              item.decimals
                            )}
                          </TokenTitle>

                          <TokenSubTitle variant="body2" noWrap align="right">
                            ≈$
                            {formatBNToString(item.balanceUSD || Zero, 18, 2)}
                          </TokenSubTitle>
                        </Grid>
                      </Grid>
                    </ListItemButton>
                  );
                })}
              </TokensContainer>
            </Grid>
          </ModalContainer>
        </SnowModal>
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
  border: `2px solid ${CssVariables.cardBorder}`,
  padding: 10,
  cursor: "pointer",
});

const ModalContainer = styled(Grid)({
  padding: 20,

  [mobile]: {
    width: "100%",
    padding: 5,
  },
});

const SearchContainer = styled(Grid)({
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: CssVariables.buttonBorderRadius,
  marginTop: 20,
  marginBottom: 20,
  backgroundColor: CssVariables.swapInputbackground,
});

const TokensContainer = styled(List)({
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: 20,
  padding: 10,
  backgroundColor: CssVariables.swapInputbackground,
});

const TokenIconContainer = styled(Grid)({
  border: `2px solid ${CssVariables.cardBorder}`,
  borderRadius: CssVariables.buttonBorderRadius,
  padding: 5,
  minWidth: 150,

  [mobile]: {
    minWidth: 100,
  },
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

  [mobile]: {
    width: "20px",
  },
});

const SelectIcon = styled(KeyboardArrowDownIcon)({
  color: CssVariables.white,
});

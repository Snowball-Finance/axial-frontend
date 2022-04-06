import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { SwapPageSelectors } from "../selectors";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { isLowerRate } from "app/containers/Swap/utils/priceImpact";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { calculateExchangeRate } from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";

export const LowerExchangeRate: FC = () => {
  const { t } = useTranslation();

  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const optimalPath = useSelector(SwapSelectors.selectBestPath);
  const bestPath = optimalPath?.bestPath;
  const account = useSelector(Web3Selectors.selectAccount);
  const tokenInputAmount = bestPath?.amounts[0] || Zero;
  const tokenOutputAmount =
    bestPath?.amounts[bestPath?.amounts.length - 1] || Zero;

  const exchangeRate = calculateExchangeRate(
    tokenInputAmount,
    selectedFromToken?.decimals || 18,
    tokenOutputAmount,
    selectedToToken?.decimals || 18
  );

  if (!(account && isLowerRate(exchangeRate))) {
    return null;
  }

  return (
    <StyledContainerItem item xs={12}>
      <Wrapper>
        <Text variant="body2">
          {t(translations.SwapPage.LowerSwapRate())}{" "}
          {((+exchangeRate / 1e18) * 100 - 100).toFixed(2)}
        </Text>
      </Wrapper>
    </StyledContainerItem>
  );
};

const StyledContainerItem = styled(Grid)({
  width: "100%",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const Wrapper = styled("div")({
  backgroundColor: CssVariables.red,
  padding: 10,
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

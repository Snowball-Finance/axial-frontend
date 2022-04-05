import { styled } from "@mui/material";
import { globalSelectors } from "app/appSelectors";
import { multiply } from "precise-math";
import { FC } from "react";
import { useSelector } from "react-redux";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";

interface Props {
  symbol?: string;
  amount?: string;
}

export const EquivalentInUSD: FC<Props> = ({ symbol, amount }) => {
  const prices = useSelector(globalSelectors.tokenPricesUSD);

  let equivalentInUSD = 0;
  if (prices && symbol && amount) {
    equivalentInUSD = multiply(prices[symbol], Number(amount) || 0);
  }
  return <StyledSpan>{`~ $${equivalentInUSD}`}</StyledSpan>;
};

const StyledSpan = styled("span")({
  color: CssVariables.commonTextColor,
  fontSize: "16px",
  fontFamily: FontFamilies.IBMPlexSans,
});

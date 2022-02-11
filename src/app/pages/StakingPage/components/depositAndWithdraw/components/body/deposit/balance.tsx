import { styled } from "@mui/material";
import { BlockChainSelectors } from "app/containers/BlockChain/selectors";
import { BNToString } from "common/format";
import { BigNumber } from "ethers";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Balance = () => {
  const { t } = useTranslation();
  const mainTokenBalance = useSelector(
    BlockChainSelectors.selectMainTokenBalance
  );
  const stringMainTokenBalance = BNToString(
    mainTokenBalance ?? BigNumber.from(0),
    18
  );
  return (
    <BalanceText>
      {t(translations.Common.Balance())}:{" "}
      {parseFloat(stringMainTokenBalance || "0").toFixed(3)}
    </BalanceText>
  );
};

const BalanceText = styled("p")({
  fontSize: "14px",
  fontWeight: "400",
  color: CssVariables.commonTextColor,
  margin: 0,
  textAlign: "end",
});

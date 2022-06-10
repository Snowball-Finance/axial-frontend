import { styled, Typography } from "@mui/material";
import { BigNumber } from "ethers";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { BlockChainSelectors } from "app/containers/BlockChain/selectors";
import { BNToString } from "common/format";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { commify } from "app/containers/utils/contractUtils";

export const WalletBalance = () => {
  const { t } = useTranslation();
  const mainTokenBalance = useSelector(
    BlockChainSelectors.selectMainTokenBalance
  );
  const stringMainTokenBalance = BNToString(
    mainTokenBalance ?? BigNumber.from(0),
    18
  );
  const commified = commify(
    parseFloat(stringMainTokenBalance || "0").toFixed(3)
  );

  return (
    <BalanceText variant="body2" align="right">
      {t(translations.Common.WalletBalance())}: {commified}
    </BalanceText>
  );
};

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});

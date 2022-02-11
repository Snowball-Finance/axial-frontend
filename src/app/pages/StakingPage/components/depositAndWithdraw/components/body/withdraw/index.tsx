import { styled } from "@mui/material";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { BNToFloat } from "common/format";
import { env } from "environment";
import { BigNumber } from "ethers";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { WithdrawBottomDescriptions } from "./bottomDescriptions";
import { WithdrawButton } from "./withdrawButton";

export const Withdraw = () => {
  const { t } = useTranslation();
  const governanceTokenName = env.GOVERNANCE_TOKEN_NAME;
  const rawGovernanceTokenBalance = useSelector(
    GovernanceSelectors.selectGovernanceTokenBalance
  );
  const governanceTokenBalance = BNToFloat(
    rawGovernanceTokenBalance ?? BigNumber.from(0),
    18
  )?.toFixed(3);
  return (
    <Wrapper>
      <Title>{t(translations.Staking.WithdrawTokens())}</Title>
      <Amount>
        {t(
          translations.Staking.AvailableToWithdraw_AMOUNT_GOVERNANCETOKENNAME(),
          {
            amount: governanceTokenBalance,
            governanceTokenName,
          }
        )}
      </Amount>
      <WithdrawBottomDescriptions />
      <WithdrawButton />
    </Wrapper>
  );
};
const Title = styled("h6")({
  fontSize: "24px",
  fontWeight: "600",
  color: CssVariables.darkText,
  margin: 0,
  marginTop: "16px",
});
const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});
const Amount = styled("h6")({
  fontSize: "16px",
  fontWeight: "600",
  margin: 0,
  color: CssVariables.primary,
  textAlign: "center",
});

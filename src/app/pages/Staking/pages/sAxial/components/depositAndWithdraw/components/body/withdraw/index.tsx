import { styled } from "@mui/material";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
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
  const rawClaimableAxial = useSelector(
    StakingSelectors.claimableGovernanceToken
  );
  const unlockedAxialAmount = BNToFloat(
    rawClaimableAxial ?? BigNumber.from(0),
    18
  )?.toFixed(3);
  return (
    <Wrapper>
      <Title>{t(translations.Staking.WithdrawTokens())}</Title>
      <Amount>
        {t(
          translations.Staking.AvailableToWithdraw_AMOUNT_GOVERNANCETOKENNAME(),
          {
            amount: unlockedAxialAmount,
            governanceTokenName: env.MAIN_TOKEN_NAME,
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
  color: CssVariables.commonTextColor,
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

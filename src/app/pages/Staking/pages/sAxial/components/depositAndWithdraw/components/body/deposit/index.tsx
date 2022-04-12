import { styled } from "@mui/material";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Balance } from "./balance";
import { LockPeriod } from "./lockPeriod";
import { MaxButton } from "./maxButton";
import { LockPeriodSlider } from "./slider";
import { StakeButton } from "./stakeButton";
import { StakingAmount } from "./stakingAmount";
import { mobile } from "styles/media";
import { AdvancedOptions } from "./advancedOptions";

export const Deposit = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <BalanceAndAmountWrapper>
        <TitleAndMaxWrapper>
          <Title>{t(translations.Staking.Lock())}</Title>
          <MaxButton />
        </TitleAndMaxWrapper>
        <StakingAmount />
        <Balance />
      </BalanceAndAmountWrapper>
      <LockPeriod />
      <LockPeriodSlider />
      <AdvancedOptions />
      <StakeButton />
      {/* <DepositYouWillGet /> */}
    </Wrapper>
  );
};

const TitleAndMaxWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
});

const BalanceAndAmountWrapper = styled("div")({});
const Title = styled("h6")({
  fontSize: "24px",
  fontWeight: "600",
  color: CssVariables.commonTextColor,
  margin: 0,
  textTransform: "uppercase",
});
const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",

  [mobile]: {
    width: "100%",
  },
});

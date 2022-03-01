import { styled } from "@mui/material";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { env } from "environment";
import { translations } from "locales/i18n";
import { ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const StakingAmount = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleMaxClick = () => {
    dispatch(StakingPageActions.stakeAllTheBalances());
  };

  const enteredAmount = useSelector(
    StakingPageSelectors.selectEnteredMainTokenToStake
  );

  const handleAmountInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(StakingPageActions.setEnteredMainTokenToStake(e.target.value));
    document.getElementById("stakeButton")?.scrollIntoView();
  };

  return (
    <Wrapper>
      <NameIconAndMaxButtonWrapper>
        <Icon src={env.GOVERNANCE_TOKEN_LOGO_ADDRESS} />
        <MainTokenName>{env.MAIN_TOKEN_NAME}</MainTokenName>
        <MaxButton onClick={handleMaxClick}>
          {t(translations.Common.Max())}
        </MaxButton>
      </NameIconAndMaxButtonWrapper>
      <AmountInput
        autoFocus
        onChange={handleAmountInputChange}
        value={enteredAmount}
      />
    </Wrapper>
  );
};

const MaxButton = styled(OutlinedButton)({});

const MainTokenName = styled("span")({
  color: CssVariables.commonTextColor,
});

const Icon = styled("img")({
  width: "32px",
  height: "32px",
  borderRadius: "60px",
});

const AmountInput = styled("input")({
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: "16px",
  fontWeight: "600",
  color: CssVariables.commonTextColor,
  padding: "0 0 0 8px",
  background: "transparent",
});

const NameIconAndMaxButtonWrapper = styled("div")({
  display: "flex",
  gap: "16px",
  alignItems: "center",
});
const Wrapper = styled("div")({
  padding: "16px 18px",
  borderRadius: CssVariables.paperBorderRadius,
  border: `1px solid ${CssVariables.ctaBlue}`,
  display: "flex",
});

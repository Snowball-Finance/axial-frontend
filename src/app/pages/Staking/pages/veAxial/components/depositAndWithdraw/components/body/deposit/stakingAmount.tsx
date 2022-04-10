import { styled } from "@mui/material";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { env } from "environment";
import { ChangeEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";

export const StakingAmount = () => {
  const dispatch = useDispatch();

  const enteredAmount = useSelector(
    StakingPageSelectors.selectEnteredMainTokenToStakeIntoVeAxial
  );

  const handleAmountInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(
      StakingPageActions.setEnteredMainTokenToStakeIntoVeAxial(e.target.value)
    );
    document.getElementById("stakeButton")?.scrollIntoView();
  };

  return (
    <Wrapper>
      <AmountInput
        autoFocus
        onChange={handleAmountInputChange}
        value={enteredAmount}
      />
      <NameIconWrapper>
        <Icon src={env.GOVERNANCE_TOKEN_LOGO_ADDRESS} />
        <MainTokenName>{env.MAIN_TOKEN_NAME}</MainTokenName>
      </NameIconWrapper>
    </Wrapper>
  );
};

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
  fontSize: "26px",
  fontFamily: FontFamilies.FugazOne,
  color: CssVariables.commonTextColor,
  padding: "0 0 0 8px",
  background: "transparent",
  maxWidth: "calc(100% - 125px )",

  [mobile]: {
    width: "100%",
    padding: 0,
  },
});

const NameIconWrapper = styled("div")({
  display: "flex",
  gap: "16px",
  alignItems: "center",
  padding: "0px 12px",
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: CssVariables.paperBorderRadius,

  [mobile]: {
    width: "100%",
    padding: 0,
  },
});

const Wrapper = styled("div")({
  padding: "16px 18px",
  borderRadius: CssVariables.paperBorderRadius,
  border: `4px solid ${CssVariables.cardBorder}`,
  display: "flex",

  [mobile]: {
    width: "100%",
  },
});

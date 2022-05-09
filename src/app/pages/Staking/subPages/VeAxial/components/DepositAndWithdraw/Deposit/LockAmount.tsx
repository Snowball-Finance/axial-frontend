import { ChangeEventHandler } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { env } from "environment";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { EquivalentLockAmountUSD } from "./EquivalentLockAmountUSD";
import { Max } from "./Max";
import { WalletBalance } from "./WalletBalance";

export const LockAmount = () => {
  const { t } = useTranslation();

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
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Text variant="h2">{t(translations.Staking.Stake())}</Text>
          </Grid>

          <Grid item>
            <Max />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CardWrapper>
          <StyledInputContainer container>
            <StyledChildInputContainer item>
              <Grid container direction="column">
                <Grid item>
                  <AmountInput
                    autoFocus
                    onChange={handleAmountInputChange}
                    value={enteredAmount}
                    placeholder="0.00"
                  />
                </Grid>
                <Grid item>
                  <EquivalentLockAmountUSD />
                </Grid>
              </Grid>
            </StyledChildInputContainer>

            <StyledChildInputContainer item>
              <TokenIconContainer>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Grid item>
                    <TokenIcon
                      src={env.GOVERNANCE_TOKEN_LOGO_ADDRESS}
                      alt={`governance-token`}
                    />
                  </Grid>

                  <Grid item>
                    <TokenTitle variant="h2">{env.MAIN_TOKEN_NAME}</TokenTitle>
                  </Grid>
                </Grid>
              </TokenIconContainer>
            </StyledChildInputContainer>
          </StyledInputContainer>
        </CardWrapper>
      </Grid>

      <Grid item xs={12}>
        <WalletBalance />
      </Grid>
    </Grid>
  );
};

const StyledInputContainer = styled(Grid)({
  justifyContent: "space-between",
  alignItems: "center",

  [mobile]: {
    flexDirection: "row",
  },
});

const StyledChildInputContainer = styled(Grid)({
  [mobile]: {
    width: "50%",
  },
});

const TokenIconContainer = styled("div")({
  border: `2px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "6px 16px",
});

const TokenTitle = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const TokenIcon = styled("img")({
  width: "32px",
  height: "32px",

  [mobile]: {
    width: "25px",
    height: "25px",
  },
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
    padding: 0,
  },
});

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

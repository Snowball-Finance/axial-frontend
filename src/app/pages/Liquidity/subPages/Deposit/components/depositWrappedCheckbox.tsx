import { styled, Checkbox, Typography } from "@mui/material";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const DepositWrappedCheckbox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const depositRaw = useSelector(LiquidityPageSelectors.depositRaw);
  const handleDepositWrappedClick = () => {
    const tmp = depositRaw ? false : true;
    dispatch(LiquidityPageActions.setDepositRaw(tmp));
    dispatch(LiquidityPageActions.resetTokens());
  };
  return (
    <Wrapper onClick={() => handleDepositWrappedClick()}>
      <CustomCheckbox checked={!depositRaw} />
      <Text variant="body2">
        {t(translations.LiquidityPage.DepositWrapped())}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  gap: "8px",
  cursor: "pointer",
  alignItems: "center",
  marginTop: "12px",
  paddingLeft: "12px",
});

const Text = styled(Typography)({
  color: CssVariables.bodyTextColor,
  fontSize: "16px",
});

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.primary,
  },
});

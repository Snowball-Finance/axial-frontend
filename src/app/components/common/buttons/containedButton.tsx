import { styled } from "@mui/material";
import { SnowButtonProps, SnowButton } from "app/components/base/snowButton";
import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const ContainedButton: FC<SnowButtonProps> = (props) => {
  return <StyledButton variant="contained" {...props} />;
};

const StyledButton = styled(SnowButton)(({ theme }) => ({
  color: CssVariables.white,
  border: `2px solid ${CssVariables.white}`,
  padding: `10px 36px`,
  borderRadius: CssVariables.buttonBorderRadius,
  "&:hover": {
    backgroundColor: CssVariables.primaryHover,
    color: CssVariables.primaryHoverStroke,
    border: `2px solid ${CssVariables.primaryHoverStroke}`
  },
  "&.Mui-disabled": {
    border: `2px solid ${CssVariables.primaryDisabledStroke}`,
    color: CssVariables.primaryDisabledStroke,
    backgroundColor: CssVariables.primaryDisabled,
  },
  "&:active": {
    border: `2px solid ${CssVariables.primaryPressedStroke}`,
    color: CssVariables.primaryPressedStroke,
    backgroundColor: CssVariables.primaryPressed,
  }
}));

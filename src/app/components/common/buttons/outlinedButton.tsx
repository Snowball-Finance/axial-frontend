import { styled } from "@mui/material";
import React, { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowButton, SnowButtonProps } from "../../base/snowButton";

export const OutlinedButton: FC<SnowButtonProps> = (props) => {
  return <StyledButton variant="outlined" {...props} />;
};

const StyledButton = styled(SnowButton)(({ theme }) => ({
  borderRadius: CssVariables.buttonBorderRadius,
  borderWidth: "2px",
  backgroundColor: CssVariables.swapInputbackground,
  "&:hover": {
    backgroundColor: CssVariables.secondaryHover,
    color: CssVariables.secondaryHoverStroke,
    border: `2px solid ${CssVariables.secondaryHoverStroke}`
  },
  "&.Mui-disabled": {
    border: `2px solid ${CssVariables.secondaryDisabledStroke}`,
    color: CssVariables.secondaryDisabledStroke,
    backgroundColor: CssVariables.secondaryDisabled,
  },
  "&:active": {
    border: `2px solid ${CssVariables.secondaryPressedStroke}`,
    color: CssVariables.secondaryPressedStroke,
    backgroundColor: CssVariables.secondaryPressed,
  }
}));

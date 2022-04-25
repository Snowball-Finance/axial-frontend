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
    borderWidth: "2px",
  },
  "&.Mui-disabled": {
    border: `2px solid ${CssVariables.primaryDisabled}`,
    color: CssVariables.primaryDisabled,
  },
}));

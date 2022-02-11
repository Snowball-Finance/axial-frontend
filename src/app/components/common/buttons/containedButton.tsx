import { styled } from "@mui/material";
import React, { FC } from "react";
import { CssVariables } from "../../../../styles/cssVariables/cssVariables";
import { SnowButton, SnowButtonProps } from "../../base/snowButton";

export const ContainedButton: FC<SnowButtonProps> = (props) => {
  return <StyledButton variant="contained" {...props} />;
};

const StyledButton = styled(SnowButton)(({ theme }) => ({
  borderRadius: CssVariables.buttonBorderRadius,
  "&.Mui-disabled": {
    color: CssVariables.paperBackground,
    backgroundColor: CssVariables.primaryDisabled,
  },
}));

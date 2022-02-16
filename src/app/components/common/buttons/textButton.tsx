import { styled } from "@mui/material";
import React, { FC } from "react";
import { CssVariables } from "../../../../styles/cssVariables/cssVariables";
import { SnowButton, SnowButtonProps } from "../../base/snowButton";

export const TextButton: FC<SnowButtonProps> = (props) => {
  return <StyledButton variant="text" {...props} />;
};

const StyledButton = styled(SnowButton)({
  "&.Mui-disabled": {
    color: CssVariables.grey,
  },
});

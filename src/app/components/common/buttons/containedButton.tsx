import { styled } from "@mui/material";
import { SnowButtonProps, SnowButton } from "app/components/base/snowButton";
import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const ContainedButton: FC<SnowButtonProps> = (props) => {
  return <StyledButton variant="contained" {...props} />;
};

const StyledButton = styled(SnowButton)(({ theme }) => ({
  borderRadius: CssVariables.paperBorderRadius,
  minHeight: "36px",
  "&.Mui-disabled": {
    color: CssVariables.grey,
  },
}));

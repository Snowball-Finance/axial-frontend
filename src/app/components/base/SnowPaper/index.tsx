import { styled } from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import React, { ReactNode } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";

export interface SnowPaperInterface extends PaperProps {
  children: ReactNode;
}

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: CssVariables.paperBackground,
}));

export const SnowPaper = ({ children, ...rest }: SnowPaperInterface) => {
  return (
    <StyledPaper elevation={3} {...rest}>
      {children}
    </StyledPaper>
  );
};

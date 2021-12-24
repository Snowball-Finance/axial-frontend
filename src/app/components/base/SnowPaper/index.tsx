import { styled } from '@mui/material';
import Paper, { PaperProps } from '@mui/material/Paper';
import { CssVariables } from "styles/cssVariables/cssVariables";

interface SnowPaperInterface extends PaperProps {
}

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  borderRadius: CssVariables.paperBorderRadius,
}));

export const SnowPaper = ({ children, ...rest }: SnowPaperInterface) => {
  return <StyledPaper elevation={3} {...rest}>{children}</StyledPaper>;
};

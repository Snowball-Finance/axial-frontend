import { styled } from '@mui/material';
import Paper, { PaperProps } from '@mui/material/Paper';
import { ReactNode } from 'react';

interface SnowPaperInterface {
  children: ReactNode;
}

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  borderRadius: '10px',
}));

export const SnowPaper = ({ children, ...rest }: SnowPaperInterface) => {
  return <StyledPaper elevation={3} {...rest}>{children}</StyledPaper>;
};

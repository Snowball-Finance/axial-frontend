import React, { FC } from "react";
import { Grid, Typography, Box, styled } from "@mui/material";
import { keyframes } from "@mui/system";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import ApprovalLoaderIcon from "assets/images/iconComponents/approvalLoader";

export const Depositing: FC = () => {
  const { t } = useTranslation();

  return (
    <Box mt={2}>
      <CardWrapper>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={2} alignItems="center">
            <Grid item>
              <StyledAnimatedWrapper>
                <ApprovalLoaderIcon />
              </StyledAnimatedWrapper>
            </Grid>

            <Grid item>
              <Typography variant="body2">
                {t(translations.Common.DepositingTokens())}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2">Steps 1/1</Typography>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledAnimatedWrapper = styled("div")({
  width: 24,
  height: 24,
  animation: `${spin} 1s linear infinite`,
});

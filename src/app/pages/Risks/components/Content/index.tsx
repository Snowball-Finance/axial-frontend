/**
 *
 * Risks Page
 *
 */

import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { contents } from "../../constants";

export const Content: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledContainer container spacing={8}>
      {contents(t).map((content) => (
        <Grid item key={content.title}>
          <Grid container spacing={2}>
            <Grid item>
              <TitleText variant="h5">{content.title}</TitleText>
            </Grid>

            <Grid item>
              <DescriptionText variant="body2">
                {content.description}
              </DescriptionText>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  width: 600,
  margin: "0px auto",
});

const TitleText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "26px",
});

const DescriptionText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});

import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";

interface Props {
  src: string;
  title: string;
}

export const TokenWithTitle: FC<Props> = ({ src, title }) => {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <StyledIcon src={src} alt={title} />
      </Grid>

      <Grid item>
        <Text variant="h2">{title}</Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const StyledIcon = styled("img")({
  maxWidth: "32px",
  maxHeight: "32px",
});

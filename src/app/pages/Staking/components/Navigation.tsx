import { FC } from "react";
import { styled, Grid, Typography, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { AppPages } from "app/types";

interface Props {
  routeName: string;
}

export const Navigation: FC<Props> = ({ routeName }) => {
  const dispatch = useDispatch();

  const goToAxialRoot = () => {
    dispatch(push(AppPages.StakingPage));
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <ArrowBackIosIcon sx={{ color: CssVariables.green }} />
      </Grid>

      <Grid item>
        <ActiveText variant="h2" onClick={goToAxialRoot}>
          PROPOSALS
        </ActiveText>
      </Grid>

      <Grid item>
        <Divider
          orientation="vertical"
          flexItem
          variant="fullWidth"
          sx={{
            bgcolor: CssVariables.green,
            width: 2,
            height: 25,
          }}
        />
      </Grid>

      <Grid item>
        <Text variant="h2">{routeName}</Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const ActiveText = styled(Typography)({
  color: CssVariables.green,
  textTransform: "uppercase",
  textDecoration: "underline",
  cursor: "pointer",
});

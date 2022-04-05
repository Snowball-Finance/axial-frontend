import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, styled, Typography, Grid } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { globalSelectors } from "app/appSelectors";
import TickInCircleIcon from "assets/images/iconComponents/tickInCircle";
import ExternalLinkIcon from "assets/images/iconComponents/externalLink";
import { CardWrapper } from "app/components/wrappers/Card";

export const TransactionSuccess: FC = () => {
  const transactionSuccessId = useSelector(
    globalSelectors.transactionSuccessId
  );

  return (
    <Box mt={2}>
      <CardWrapper>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid
            container
            item
            xs={12}
            spacing={1}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <TickInCircleIcon />
            </Grid>

            <Grid item>
              <Text variant="body2">Transaction Submited</Text>
            </Grid>
          </Grid>

          <Grid item>
            <Anchor
              target="_blank"
              rel="noreferrer"
              href={`https://snowtrace.io/tx/${transactionSuccessId}`}
            >
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Text variant="body2">View on the Snowtrace Explorer</Text>
                </Grid>
                <Grid item>
                  <ExternalLinkIcon />
                </Grid>
              </Grid>
            </Anchor>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const Anchor = styled("a")({
  textDecoration: "none",
  textAlign: "center",
});

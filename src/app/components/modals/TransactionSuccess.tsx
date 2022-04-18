import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, styled, Typography, Grid } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { globalSelectors } from "app/appSelectors";
import { GlobalActions } from "store/slice";
import TickInCircleIcon from "assets/images/iconComponents/tickInCircle";
import ExternalLinkIcon from "assets/images/iconComponents/externalLink";
import { SnowModal } from "../common/modal";
import { CardWrapper } from "../wrappers/Card";

export const TransactionSuccess: FC = () => {
  const transactionSuccessId = useSelector(
    globalSelectors.transactionSuccessId
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(GlobalActions.setTransactionSuccessId(undefined));
  };

  return (
    <SnowModal
      isOpen={transactionSuccessId !== undefined}
      onClose={handleClose}
      title="transaction status"
    >
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
                href={`${process.env.REACT_APP_EXPLORER_URL}/tx/${transactionSuccessId}`}
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
    </SnowModal>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const Anchor = styled("a")({
  textDecoration: "none",
  textAlign: "center",
});

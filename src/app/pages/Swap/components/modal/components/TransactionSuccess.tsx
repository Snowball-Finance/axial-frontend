import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, styled, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { globalSelectors } from "app/appSelectors";
import TickInCircleIcon from "assets/images/iconComponents/tickInCircle";
import ExternalLinkIcon from "assets/images/iconComponents/externalLink";
import { CardWrapper } from "app/components/wrappers/Card";

export const TransactionSuccess: FC = () => {
  const { t } = useTranslation();

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
              <Text variant="body2">
                {t(translations.SwapPage.Transaction.TransactionSubmited())}
              </Text>
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
                  <Text variant="body2">
                    {t(translations.SwapPage.Transaction.ViewOnSnowtrace())}
                  </Text>
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

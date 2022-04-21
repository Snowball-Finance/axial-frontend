import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import veAxialIcon from "assets/icons/veaxial.png";
import { TokenWithTitle } from "../TokenWithTitle";
import { VeAxialInfo } from "./Info";
import { Actions } from "./Actions";

export const VeAxialItem: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledPoolCard>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <TokenWithTitle src={veAxialIcon} title="veAXIAL" />
            </Grid>

            <Grid item>
              <Text variant="body1">
                {t(translations.Staking.StakeAxialDescription())}
              </Text>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <VeAxialInfo />
            </Grid>

            <Grid item>
              <Actions />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "26px 36px",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

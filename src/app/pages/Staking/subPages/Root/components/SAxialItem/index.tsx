import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import sAxialIcon from "assets/icons/saxial.png";
import { TokenWithTitle } from "../TokenWithTitle";
import { SAxialInfo } from "./Info";
import { Actions } from "./Actions";
import { mobile } from "styles/media";

export const SAxialItem: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledPoolCard>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StyledContainer container>
            <Grid item>
              <TokenWithTitle src={sAxialIcon} title="sAXIAL" />
            </Grid>

            <Grid item>
              <Text variant="body1">
                {t(translations.Staking.LockAxialDescription())}
              </Text>
            </Grid>
          </StyledContainer>
        </Grid>

        <Grid item xs={12}>
          <StyledLowerContainer container>
            <Grid item>
              <SAxialInfo />
            </Grid>

            <StyledFullWidthContainer item>
              <Actions />
            </StyledFullWidthContainer>
          </StyledLowerContainer>
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

  [mobile]: {
    padding: "15px 15px",
  },
});

const StyledContainer = styled(Grid)({
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",

  [mobile]: {
    justifyContent: "center",
    flexDirection: "column",
    rowGap: 10,
  },
});

const StyledLowerContainer = styled(Grid)({
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",

  [mobile]: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    rowGap: 20,
  },
});

const StyledFullWidthContainer = styled(Grid)({
  [mobile]: {
    width: "100%",
  },
});

const Text = styled(Typography)({
  color: CssVariables.white,

  [mobile]: {
    textAlign: "center",
  },
});

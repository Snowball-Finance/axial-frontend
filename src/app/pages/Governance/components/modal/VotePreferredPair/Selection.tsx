import { FC } from "react";
import { Checkbox, Grid, styled, TextField, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Selection: FC = () => {
  //   const { t } = useTranslation();

  return (
    <CardWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <Text variant="body1" align="left">
                Pairs
              </Text>
            </Grid>
            <Grid item xs={4}>
              <Text variant="body1" align="center">
                Your Allocation
              </Text>
            </Grid>
            <Grid item xs={4}>
              <Text variant="body1" align="right">
                Variation
              </Text>
            </Grid>
          </Grid>
        </Grid>

        {[1, 2, 3, 4].map((item) => {
          return (
            <Grid item xs={12} key={item}>
              <Grid container>
                <Grid item xs={4}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Grid item>
                      <CustomCheckbox checked={false} onChange={() => {}} />
                    </Grid>
                    <Grid item>
                      <Text variant="body1">AC4D</Text>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent="center"
                  >
                    <Grid item>
                      <InputField
                        value={""}
                        onChange={() => {}}
                        isselected={undefined}
                      />
                    </Grid>

                    <Grid item>
                      <PercentageText variant="body1">%</PercentageText>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Text variant="body2" align="right">
                    {"0.05% -> 0.0%"}
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </CardWrapper>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const PercentageText = styled(Typography)({
  color: CssVariables.green,
});

const InputField = styled(TextField)<{ isselected: "true" | undefined }>(
  ({ isselected }) => ({
    ".MuiInputBase-root": {
      color: CssVariables.white,
      fontSize: "16px",
      width: 60,
      height: 30,
    },

    ".MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${CssVariables.green} !important`,
      borderRadius: CssVariables.buttonBorderRadius,
    },
    ...(isselected && {
      backgroundColor: CssVariables.ctaBlue,
      borderRadius: CssVariables.buttonBorderRadius,
    }),
  })
);

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.green,
  },
});

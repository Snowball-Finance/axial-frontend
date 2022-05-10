/**
 *
 * Risks Page
 *
 */

import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Content: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <TitleText variant="h2">
              {t(translations.RisksPage.RiskContent.Title())}
            </TitleText>
          </Grid>

          <Grid item>
            <DescriptionText variant="body1">
              {t(translations.RisksPage.RiskContent.Description1())}{" "}
              <Anchor
                target="_blank"
                rel="noreferrer"
                href={t(translations.RisksPage.RiskContent.AnchorLink())}
              >
                {t(translations.RisksPage.RiskContent.AnchorText())}{" "}
              </Anchor>
              {t(translations.RisksPage.RiskContent.Description2())}
            </DescriptionText>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <TitleText variant="h2">
              {t(translations.RisksPage.AuditsContent.Title())}
            </TitleText>
          </Grid>

          <Grid item>
            <DescriptionText variant="body1">
              {t(translations.RisksPage.AuditsContent.Description1())}{" "}
              <Anchor
                target="_blank"
                rel="noreferrer"
                href={t(translations.RisksPage.AuditsContent.AnchorLink1())}
              >
                {t(translations.RisksPage.AuditsContent.AnchorText1())}{" "}
              </Anchor>
              {t(translations.RisksPage.AuditsContent.Description2())}{" "}
              <Anchor
                target="_blank"
                rel="noreferrer"
                href={t(translations.RisksPage.AuditsContent.AnchorLink2())}
              >
                {t(translations.RisksPage.AuditsContent.AnchorText2())}{" "}
              </Anchor>
            </DescriptionText>

            <DescriptionText variant="body1">
              {t(translations.RisksPage.AuditsContent.Description3())}{" "}
            </DescriptionText>

            <DescriptionText variant="body1">
              {t(translations.RisksPage.AuditsContent.Description4())}{" "}
            </DescriptionText>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <TitleText variant="h2">
              {t(translations.RisksPage.AdminKeysContent.Title())}
            </TitleText>
          </Grid>

          <Grid item>
            <DescriptionText variant="body1">
              {t(translations.RisksPage.AdminKeysContent.Description1())}{" "}
              <Anchor
                target="_blank"
                rel="noreferrer"
                href={t(translations.RisksPage.AdminKeysContent.AnchorLink1())}
              >
                {t(translations.RisksPage.AdminKeysContent.AnchorText1())}{" "}
              </Anchor>
              {t(translations.RisksPage.AdminKeysContent.Description2())}{" "}
              <Anchor
                target="_blank"
                rel="noreferrer"
                href={t(translations.RisksPage.AdminKeysContent.AnchorLink2())}
              >
                {t(translations.RisksPage.AdminKeysContent.AnchorText2())}{" "}
              </Anchor>
              {t(translations.RisksPage.AdminKeysContent.Description3())}{" "}
            </DescriptionText>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <TitleText variant="h2">
              {t(translations.RisksPage.PermanentLossContent.Title())}
            </TitleText>
          </Grid>

          <Grid item>
            <DescriptionText variant="body1">
              {t(translations.RisksPage.PermanentLossContent.Description())}
            </DescriptionText>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <TitleText variant="h2">
              {t(translations.RisksPage.TokenApprovalsContent.Title())}
            </TitleText>
          </Grid>

          <Grid item>
            <DescriptionText variant="body1">
              {t(translations.RisksPage.TokenApprovalsContent.Description())}
            </DescriptionText>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Anchor = styled("a")({
  textDecoration: "none",
  color: CssVariables.green,
});

const TitleText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const DescriptionText = styled(Typography)({
  color: CssVariables.white,
});

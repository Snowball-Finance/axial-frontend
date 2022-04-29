import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import ClockIcon from "assets/images/iconComponents/clock";
import DiscordChatIcon from "assets/images/iconComponents/discordChat";
import DocumentIcon from "assets/images/iconComponents/document";
import ExternalLinkIcon from "assets/images/iconComponents/externalLink";

interface Props {
  discordLink: string;
  documentLink: string;
  startTime: string;
  endTime: string;
}

export const DocLinksAndInfo: FC<Props> = ({
  discordLink,
  documentLink,
  startTime,
  endTime,
}) => {
  const { t } = useTranslation();

  return (
    <StyledPoolCard>
      <Grid container>
        <Grid item container spacing={1} alignItems="center" xs={6}>
          <Grid item>
            <DiscordChatIcon color={CssVariables.commonTextColor} />
          </Grid>

          <Grid item>
            <Text variant="body1">
              {t(translations.GovernancePage.DiscussionURL())}
            </Text>
          </Grid>

          <Grid item>
            <Anchor target="_blank" rel="noreferrer" href={discordLink}>
              <ExternalLinkIcon color={CssVariables.primary} />
            </Anchor>
          </Grid>
        </Grid>

        <Grid item container spacing={1} alignItems="center" xs={6}>
          <Grid item>
            <ClockIcon color={CssVariables.commonTextColor} />
          </Grid>

          <Grid item>
            <Text variant="body1">
              {t(translations.GovernancePage.StartedVotedAt())}
            </Text>
          </Grid>

          <Grid item>
            <Text variant="body2">{startTime}</Text>
          </Grid>
        </Grid>

        <Grid item container spacing={1} alignItems="center" xs={6}>
          <Grid item>
            <DocumentIcon color={CssVariables.commonTextColor} />
          </Grid>

          <Grid item>
            <Text variant="body1">
              {t(translations.GovernancePage.ProsConsDocumentURL())}
            </Text>
          </Grid>

          <Grid item>
            <Anchor target="_blank" rel="noreferrer" href={documentLink}>
              <ExternalLinkIcon color={CssVariables.primary} />
            </Anchor>
          </Grid>
        </Grid>

        <Grid item container spacing={1} alignItems="center" xs={6}>
          <Grid item>
            <ClockIcon color={CssVariables.commonTextColor} />
          </Grid>

          <Grid item>
            <Text variant="body1">
              {t(translations.GovernancePage.EndedVotedAt())}
            </Text>
          </Grid>

          <Grid item>
            <Text variant="body2">{endTime}</Text>
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
  padding: "20px",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const Anchor = styled("a")({
  textDecoration: "none",
  textAlign: "center",
});

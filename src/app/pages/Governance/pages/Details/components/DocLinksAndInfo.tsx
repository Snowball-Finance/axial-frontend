import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";

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
  return (
    <StyledPoolCard>
      <Grid container>
        <Grid item container spacing={1} alignItems="center" xs={6}>
          <Grid item>
            <DiscordChatIcon />
          </Grid>

          <Grid item>
            <Text variant="body1">Discord proposal</Text>
          </Grid>

          <Grid item>
            <ExternalLinkIcon color={CssVariables.commonTextColor} />
          </Grid>
        </Grid>

        <Grid item container spacing={1} alignItems="center" xs={6}>
          <Grid item>
            <ClockIcon color={CssVariables.commonTextColor} />
          </Grid>

          <Grid item>
            <Text variant="body1">Started voted at</Text>
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
            <Text variant="body1">Proposal document</Text>
          </Grid>

          <Grid item>
            <ExternalLinkIcon color={CssVariables.commonTextColor} />
          </Grid>
        </Grid>

        <Grid item container spacing={1} alignItems="center" xs={6}>
          <Grid item>
            <ClockIcon color={CssVariables.commonTextColor} />
          </Grid>

          <Grid item>
            <Text variant="body1">Ended voted at</Text>
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

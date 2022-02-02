import { Divider, styled } from "@mui/material";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import ClickIcon from "../../../../../assets/iconComponents/clock";
import DiscordChatIcon from "../../../../../assets/iconComponents/discordChat";
import DocumentIcon from "../../../../../assets/iconComponents/document";
import ExternalLinkIcon from "../../../../../assets/iconComponents/externalLink";
import { SnowPaper } from "../../../../../components/injectedByNewStructure/base/SnowPaper";
import { CssVariables } from "../../../../../styles/cssVariables/cssVariables";

interface AdditionalDataProps {
  discordLink: string;
  documentLink: string;
  startTime: string;
  endTime: string;
}
export const AdditionalData: FC<AdditionalDataProps> = ({
  discordLink,
  documentLink,
  endTime,
  startTime,
}) => {
  const { t } = useTranslation();
  const handleLinkClick = (link: string) => {
    window.open(link);
  };
  return (
    <Wrapper>
      {discordLink ? (
        <LinkContainer onClick={() => handleLinkClick(discordLink)}>
          <DiscordChatIcon />
          {t("DiscussionofproposalinDiscord")}
          <ExternalLinkIcon />
        </LinkContainer>
      ) : (
        <></>
      )}
      {documentLink ? (
        <LinkContainer onClick={() => handleLinkClick(documentLink)}>
          <DocumentIcon color={CssVariables.white} />
          {t("ProposalDocument")}
          <ExternalLinkIcon />
        </LinkContainer>
      ) : (
        <></>
      )}
      <Divider />
      <TimeWrapper>
        <IconAndTimeContainer>
          <ClickIcon color={CssVariables.white} />
          {t("Votingperiodbegins")}
        </IconAndTimeContainer>
        <Time>{new Date(startTime).toLocaleString()}</Time>
      </TimeWrapper>
      <TimeWrapper>
        <IconAndTimeContainer>
          <ClickIcon color={CssVariables.white} />
          {t("Votingperiodends")}
        </IconAndTimeContainer>
        <Time>{new Date(endTime).toLocaleString()}</Time>
      </TimeWrapper>
    </Wrapper>
  );
};

const Time = styled("p")({
  margin: 0,
  fontSize: "14px",
  fontWeight: 500,
  color: CssVariables.white,
});

const IconAndTimeContainer = styled("div")({
  fontSize: "14px",
  display: "flex",
  gap: "8px",
});

const TimeWrapper = styled("div")({});

const LinkContainer = styled("div")({
  display: "flex",
  gap: "8px",
  cursor: "pointer",
});

const Wrapper = styled(SnowPaper)({
  padding: "20px",
  display: "flex",
  gap: "16px",
  flexDirection: "column",
  color:CssVariables.white
});

import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import hand from "assets/images/vote-hand.png";
import { styled } from "@mui/material";
import { Max1040 } from "app/components/wrappers/max1040";
import { VotePower } from "../../components/votePower";
import { InfoButtonProps } from "app/components/common/buttons/infoButton";
import InfoIcon from "assets/images/iconComponents/info";
import DiscordIcon from "assets/images/iconComponents/discord";
import { TopInfoCard } from "../../components/topInfoCard";
import { TopWrapper } from "./components/topWrapper";
import { ProposalsList } from "./components/list";
import { NewProposalForm } from "./newProposalForm";
import { mobile } from "styles/media";
import { env } from "environment";

export const Proposals: FC = () => {
  const { t } = useTranslation();

  const actionButtons: InfoButtonProps[] = [
    {
      icon: <InfoIcon />,
      title: t(translations.Common.MoreInfo()),
      onClick: () => {
        window.open(env.GOVERNANCE_INFO_LINK);
      },
    },
    {
      icon: <DiscordIcon />,
      title: t(translations.External.Discord()),
      onClick: () => {},
    },
  ];

  return (
    <StyledMax1040 m="auto" mt={2}>
      <NewProposalForm />
      <Header>
        <TopInfoCard
          title={t(translations.GovernancePage.ActiveProposals())}
          desc={t(translations.GovernancePage.ActiveProposalsDescriptions())}
          endImage={hand}
          actionButtons={actionButtons}
        />
        <VotePower />
      </Header>
      <TopWrapper />
      <ProposalsList />
    </StyledMax1040>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  position: "relative",
  [mobile]: {
    padding: "0 16px",
  },
}));

const Header = styled("div")({
  display: "flex",
  gap: "6px",
  [mobile]: {
    flexDirection: "column",
    gap: "24px",
  },
});

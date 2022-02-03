import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { styled } from "@mui/material"
import { VotePower } from "../../components/votePower"
import { TopInfoCard } from "../../components/topInfoCard"
import { TopWrapper } from "./components/topWrapper"
import { ProposalsList } from "./components/list"
import { NewProposalForm } from "./newProposalForm"
import { mobile } from "styles/media"
import { env } from "environment"
import DiscordIcon from "assets/iconComponents/discord"
import InfoIcon from "assets/iconComponents/info"
import {
  InfoButton,
  InfoButtonProps,
} from "components/injectedByNewStructure/common/buttons/infoButton"
import { Max1040 } from "components/injectedByNewStructure/wrappers/max1040"
import voteBox from "assets/voteBox.svg"
import { ContainedButton } from "components/injectedByNewStructure/common/buttons/containedButton"
export const Proposals: FC = () => {
  const { t } = useTranslation()

  const actionButtons = [
    <ContainedButton key={1} height={32}>
      {`Stake ${env.MAIN_TOKEN_NAME}`}
    </ContainedButton>,

    <InfoButton key={2} title={t("Discord")} icon={<></>} />,
  ]

  return (
    <StyledMax1040 m="auto" mt={2}>
      <NewProposalForm />
      <Header>
        <TopInfoCard
          title={t("ActiveProposals")}
          desc={t("ActiveProposalsDescriptions")}
          actionButtons={actionButtons}
          endImage={voteBox}
        />
        <VotePower />
      </Header>
      <TopWrapper />
      <ProposalsList />
    </StyledMax1040>
  )
}

const StyledMax1040 = styled(Max1040)(() => ({
  position: "relative",
  [mobile]: {
    padding: "0 16px",
  },
}))

const Header = styled("div")({
  display: "flex",
  gap: "6px",
  [mobile]: {
    flexDirection: "column",
    gap: "24px",
  },
})

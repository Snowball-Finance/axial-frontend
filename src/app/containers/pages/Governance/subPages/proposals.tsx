import { translations } from "locales/i18n"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { TopInfoCard } from "../components/topInfoCard"
import hand from 'assets/images/vote-hand.png'
import { styled } from "@mui/material"
import { Max1040 } from "app/components/wrappers/max1040"
import { VotePower } from "../components/votePower"

interface ProposalsProps {
  filter: 'all' | 'active'
}
export const Proposals: FC<ProposalsProps> = ({ filter }) => {

  const { t } = useTranslation()

  return (
    <Max1040 m="auto" mt={2}>
      <TopWrapper>
        <TopInfoCard
          title={t(translations.GovernancePage.ActiveProposals())}
          desc={t(translations.GovernancePage.ActiveProposalsDescriptions())}
          endImage={hand}
        />
        <VotePower />
      </TopWrapper>
    </Max1040>
  )
}

const TopWrapper = styled('div')({
  display: 'flex',
  gap:'6px'
})
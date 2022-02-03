import { styled } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { DiscussionInput } from "./inputs/discussion"
import { DocumentInput } from "./inputs/document"
import { VotingPeriodInput } from "./inputs/votingPeriod"
import React from "react"
import { SnowPaper } from "components/injectedByNewStructure/base/SnowPaper"
import { selectAccount } from "containers/BlockChain/Web3/selectors"
import { VotePower } from "pages/Governance/components/votePower"

export const RightSection = () => {
  const { t } = useTranslation()
  const account = useSelector(selectAccount)
  const proposer = account
  const censoredProposer = proposer
    ? proposer.substring(0, 6) +
      "***" +
      proposer.substring(proposer.length - 4, proposer.length)
    : t("NoConnectedWallet")

  return (
    <Wrapper>
      <VotePower />
      <RightSnowPaper>
        <ProposerWrapper>
          <TopTitle>{t("Proposedby")}</TopTitle>
          <Account>{censoredProposer}</Account>
        </ProposerWrapper>
        <InputTitle>
          {t("VotingPeriod")}
          <span> *</span>
        </InputTitle>
        <VotingPeriodInput />
        <InputTitle>{t("DiscussionURL")}</InputTitle>
        <DiscussionInput />
        <InputTitle>{t("ProsConsDocumentURL")}</InputTitle>
        <DocumentInput />
      </RightSnowPaper>
    </Wrapper>
  )
}

const InputTitle = styled("p")({
  fontSize: "16px",
  margin: 0,
  color: CssVariables.black,
  span: {
    color: CssVariables.red,
  },
})

const Account = styled("p")({
  fontSize: "12px",
  fontWeight: "500",
  margin: 0,
  color: CssVariables.black,
})

const TopTitle = styled("p")({
  fontSize: "16px",
  fontWeight: "500",
  margin: 0,
  color: CssVariables.black,
})

const ProposerWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
})

const Column = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
})
const RightSnowPaper = styled(SnowPaper)({
  padding: "20px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
})

const Wrapper = styled(Column)({
  ".MuiFormControl-root": {
    margin: 0,
  },
})

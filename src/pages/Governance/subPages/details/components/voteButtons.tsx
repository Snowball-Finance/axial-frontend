import { Box, styled } from "@mui/material"

import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import ThumbsDownIcon from "../../../../../assets/iconComponents/thumbsDown"
import ThumbsUpIcon from "../../../../../assets/iconComponents/thumbsUp"
import { ContainedButton } from "../../../../../components/injectedByNewStructure/common/buttons/containedButton"
import {
  selectIsVotingFor,
  selectIsVotingAgainst,
  selectReceipt,
  selectIsLoadingReceipt,
} from "../../../../../containers/BlockChain/Governance/selectors"
import { GovernanceActions } from "../../../../../containers/BlockChain/Governance/slice"
import { Proposal } from "../../../../../containers/BlockChain/Governance/types"
import { selectLibrary } from "../../../../../containers/BlockChain/Web3/selectors"
import { CssVariables } from "../../../../../styles/cssVariables/cssVariables"

export const VoteButtons: FC<{ proposal: Proposal }> = ({ proposal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const library = useSelector(selectLibrary)
  const isLoadingFor = useSelector(selectIsVotingFor)
  const isLoadingAgainst = useSelector(selectIsVotingAgainst)
  const receipt = useSelector(selectReceipt)
  const isGettingReceipt = useSelector(selectIsLoadingReceipt)

  const disabled = receipt?.hasVoted || isGettingReceipt || false
  const handleForClick = () => {
    if (library) {
      dispatch(GovernanceActions.vote({ proposal, voteFor: true }))
    }
  }

  const handleAgainstClick = () => {
    if (library) {
      dispatch(GovernanceActions.vote({ proposal, voteFor: false }))
    }
  }

  return (
    <ButtonsWrapper>
      <ForButton
        disabled={disabled}
        loading={isLoadingFor}
        onClick={handleForClick}
      >
        <Box mr="8px">
          <ThumbsUpIcon color={CssVariables.white} />
        </Box>
        {t("VoteFor")}
      </ForButton>
      <AgainstButton
        disabled={disabled}
        loading={isLoadingAgainst}
        onClick={handleAgainstClick}
      >
        <Box mr="8px">
          <ThumbsDownIcon color={CssVariables.white} />
        </Box>
        {t("VoteAgainst")}
      </AgainstButton>
    </ButtonsWrapper>
  )
}

const BigButton = styled(ContainedButton)({
  flex: 1,
  height: "58px",
  minWidth: "calc(50% - 8px)",
})

const ForButton = styled(BigButton)({
  background: CssVariables.green,
  ":hover": {
    background: CssVariables.green,
  },
})
const AgainstButton = styled(BigButton)({
  background: CssVariables.red,
  ":hover": {
    background: CssVariables.red,
  },
})

const ButtonsWrapper = styled("div")({
  display: "flex",
  gap: "16px",
})

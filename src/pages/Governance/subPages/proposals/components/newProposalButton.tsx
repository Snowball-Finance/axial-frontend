import { Box, styled } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import AddInCircleIcon from "../../../../../assets/iconComponents/addInCircle"
import { ContainedButton } from "../../../../../components/injectedByNewStructure/common/buttons/containedButton"
import { selectCanAddNewProposal } from "../../../../../containers/BlockChain/Governance/selectors"
import { GovernanceActions } from "../../../../../containers/BlockChain/Governance/slice"
import { CssVariables } from "../../../../../styles/cssVariables/cssVariables"

export const NewProposalButton = () => {
  const dispatch = useDispatch()
  const canAddNewProposal = useSelector(selectCanAddNewProposal)

  const handleClick = () => {
    dispatch(GovernanceActions.setIsNewProposalFormOpen(true))
  }

  const { t } = useTranslation()
  return (
    <StyledButton disabled={!canAddNewProposal} onClick={handleClick}>
      <Box mr={1} display="flex">
        <AddInCircleIcon
          color={!canAddNewProposal ? CssVariables.grey : CssVariables.white}
        />
      </Box>
      {t("NewProposal")}
    </StyledButton>
  )
}

const StyledButton = styled(ContainedButton)({
  fontSize: "16px",
  height: "48px",
})

import { ContainedButton } from "components/injectedByNewStructure/common/buttons/containedButton"
import {
  selectNewProposalFields,
  selectIsSubmittingNewProposal,
} from "containers/BlockChain/Governance/selectors"
import { GovernanceActions } from "containers/BlockChain/Governance/slice"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import React from "react"

export const NewProposalSubmitButton = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const fields = useSelector(selectNewProposalFields)
  const isLoading = useSelector(selectIsSubmittingNewProposal)

  const handleSubmitButton = () => {
    dispatch(GovernanceActions.submitNewProposal())
  }

  const { title, votingPeriod, description } = fields
  const disabled = !title || !votingPeriod || !description
  return (
    <ContainedButton
      loading={isLoading}
      disabled={disabled}
      height={48}
      width={85}
      onClick={handleSubmitButton}
    >
      {t("Submit")}
    </ContainedButton>
  )
}

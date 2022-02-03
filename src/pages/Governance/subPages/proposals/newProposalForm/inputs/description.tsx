import { TextField } from "@mui/material"
import { selectNewProposalField } from "containers/BlockChain/Governance/selectors"
import { GovernanceActions } from "containers/BlockChain/Governance/slice"
import { useDispatch, useSelector } from "react-redux"
import React from "react"

export const DescriptionInput = () => {
  const fieldName = "description"
  const dispatch = useDispatch()
  const description = useSelector(selectNewProposalField(fieldName))

  const handleInputChange = (value: string) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }))
  }

  return (
    <TextField
      fullWidth
      variant="outlined"
      multiline
      rows={15}
      onChange={({ target }) => handleInputChange(target.value)}
      value={description}
    />
  )
}

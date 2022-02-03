import { TextField } from "@mui/material"
import { selectNewProposalField } from "containers/BlockChain/Governance/selectors"
import { GovernanceActions } from "containers/BlockChain/Governance/slice"
import { useDispatch, useSelector } from "react-redux"
import React from "react"

export const DocumentInput = () => {
  const fieldName = "document"
  const dispatch = useDispatch()
  const document = useSelector(selectNewProposalField(fieldName))

  const handleInputChange = (value: string) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }))
  }
  return (
    <TextField
      margin="dense"
      size="small"
      onChange={({ target }) => handleInputChange(target.value)}
      value={document}
      fullWidth
      placeholder="https://docs.google.com/..."
    />
  )
}

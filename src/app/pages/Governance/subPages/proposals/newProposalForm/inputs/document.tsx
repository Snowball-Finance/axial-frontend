import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";

export const DocumentInput = () => {
  const fieldName = "document";
  const dispatch = useDispatch();
  const document = useSelector(
    GovernanceSelectors.selectNewProposalField(fieldName)
  );

  const handleInputChange = (value: string) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }));
  };
  return (
    <TextField
      margin="dense"
      size="small"
      onChange={({ target }) => handleInputChange(target.value)}
      value={document}
      fullWidth
      placeholder="Proposal document URL"
    />
  );
};

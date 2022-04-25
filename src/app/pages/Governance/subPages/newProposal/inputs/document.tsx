import React from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";

export const DocumentInput = () => {
  const fieldName = "document";
  const dispatch = useDispatch();
  const document = useSelector(
    GovernancePageSelectors.selectNewProposalField(fieldName)
  );

  const handleInputChange = (value: string) => {
    dispatch(
      GovernancePageActions.setNewProposalFields({ key: fieldName, value })
    );
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

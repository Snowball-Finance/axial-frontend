import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";

export const DescriptionInput = () => {
  const fieldName = "description";
  const dispatch = useDispatch();
  const description = useSelector(
    GovernanceSelectors.selectNewProposalField(fieldName)
  );

  const handleInputChange = (value: string) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }));
  };

  return (
    <TextField
      sx={{ input: { color: "red" } }}
      fullWidth
      variant="outlined"
      multiline
      rows={15}
      onChange={({ target }) => handleInputChange(target.value)}
      value={description}
    />
  );
};

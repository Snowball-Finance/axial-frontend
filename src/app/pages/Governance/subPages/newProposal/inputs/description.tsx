import React from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";

export const DescriptionInput = () => {
  const fieldName = "description";
  const dispatch = useDispatch();
  const description = useSelector(
    GovernancePageSelectors.selectNewProposalField(fieldName)
  );

  const handleInputChange = (value: string) => {
    dispatch(GovernancePageActions.setNewProposalFields({ key: fieldName, value }));
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

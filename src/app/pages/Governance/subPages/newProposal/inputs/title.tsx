import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";

export const TitleInput = () => {
  const fieldName = "title";
  const dispatch = useDispatch();
  const title = useSelector(
    GovernanceSelectors.selectNewProposalField(fieldName)
  );

  const handleInputChange = (value: string) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }));
  };

  return (
    <TextField
      onChange={({ target }) => handleInputChange(target.value)}
      fullWidth
      variant="outlined"
      size="small"
      margin="dense"
      value={title}
    />
  );
};

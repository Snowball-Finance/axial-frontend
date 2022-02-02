import { TextField } from "@mui/material";
import { selectNewProposalField } from "containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "containers/BlockChain/Governance/slice";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';


export const TitleInput = () => {
  const fieldName = "title";
  const dispatch = useDispatch();
  const title = useSelector(selectNewProposalField(fieldName));

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

import { TextField } from "@mui/material";
import { selectNewProposalField } from "containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "containers/BlockChain/Governance/slice";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';


export const DiscussionInput = () => {
  const fieldName = "discussion";
  const dispatch = useDispatch();
  const discussion = useSelector(selectNewProposalField(fieldName));

  const handleInputChange = (value: string) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }));
  };
  return (
    <TextField
      margin="dense"
      size="small"
      fullWidth
      onChange={({ target }) => handleInputChange(target.value)}
      value={discussion}
      placeholder="https://discord.com/channels/..."
    />
  );
};

import { TextField } from "@mui/material";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { useDispatch, useSelector } from "react-redux";

export const DiscussionInput = () => {
  const fieldName = "discussion";
  const dispatch = useDispatch();
  const discussion = useSelector(
    GovernanceSelectors.selectNewProposalField(fieldName)
  );

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

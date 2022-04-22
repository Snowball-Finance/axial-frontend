import { TextField } from "@mui/material";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { useDispatch, useSelector } from "react-redux";

export const DiscussionInput = () => {
  const fieldName = "discussion";
  const dispatch = useDispatch();
  const discussion = useSelector(
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
      fullWidth
      onChange={({ target }) => handleInputChange(target.value)}
      value={discussion}
      placeholder="Discord proposal discussion URL"
    />
  );
};

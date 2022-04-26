import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { CssVariables } from "styles/cssVariables/cssVariables";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { GovernancePageActions } from "app/pages/Governance/slice";

interface Props {
  description: string;
  contractAddress: string;
  avaxValue: string;
  data: string;
  index: number;
}

export const ExecutionListItem: FC<Props> = ({
  description,
  contractAddress,
  avaxValue,
  data,
  index,
}) => {
  const dispatch = useDispatch();

  const handleEditClick = (index: number) => {
    dispatch(
      GovernancePageActions.setSubmittedExecutionContextForEditing({
        index,
      })
    );
  };

  const handleDeleteClick = (index: number) => {
    dispatch(
      GovernancePageActions.removeFromSubmittedExecutionContexts({
        index,
      })
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="space-between" xs={12}>
        <Grid item xs={6}>
          <Text variant="body1">Description</Text>
        </Grid>

        <Grid item xs={6}>
          <Text variant="body2" align="right">
            {description}
          </Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-between" xs={12}>
        <Grid item xs={6}>
          <Text variant="body1">Contract Address</Text>
        </Grid>

        <Grid item xs={6}>
          <Text variant="body2" align="right">
            {contractAddress}
          </Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-between" xs={12}>
        <Grid item xs={6}>
          <Text variant="body1">AVAX Value</Text>
        </Grid>

        <Grid item xs={6}>
          <Text variant="body2" align="right">
            {avaxValue}
          </Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-between" xs={12}>
        <Grid item xs={6}>
          <Text variant="body1">Data</Text>
        </Grid>

        <Grid item xs={6}>
          <Text variant="body2" align="right">
            {data}
          </Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="flex-end" xs={12} spacing={2}>
        <Grid item>
          <OutlinedButton
            startIcon={<EditOutlinedIcon />}
            onClick={() => handleEditClick(index)}
          >
            Edit
          </OutlinedButton>
        </Grid>

        <Grid item>
          <OutlinedButton
            startIcon={<DeleteOutlinedIcon />}
            onClick={() => handleDeleteClick(index)}
          >
            Delete
          </OutlinedButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

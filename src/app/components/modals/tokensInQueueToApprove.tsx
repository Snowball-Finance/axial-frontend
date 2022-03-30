import { FC } from "react";
import { useSelector } from "react-redux";
import { Grid, styled, Typography } from "@mui/material";
import {
  CircleOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { globalSelectors } from "app/appSelectors";
import { SnowModal } from "../common/modal";

export const TokenInQueueToApprove: FC = () => {
  const tokensInQueue = useSelector(globalSelectors.tokensInQueueToApprove);
  const open = Object.keys(tokensInQueue).length > 0;

  return (
    <SnowModal isOpen={open}>
      <StyledContainer container spacing={2} alignItems="center">
        {Object.keys(tokensInQueue).map((tokenSymbol) => {
          return (
            <Grid key={tokenSymbol} container item xs={12} spacing={2}>
              <Grid item>
                {tokensInQueue[tokenSymbol] ? (
                  <CheckCircleOutlineOutlined color="primary" />
                ) : (
                  <CircleOutlined color="primary" />
                )}
              </Grid>
              <Grid item>
                <Text variant="body1">{tokenSymbol}</Text>
              </Grid>
            </Grid>
          );
        })}
      </StyledContainer>
    </SnowModal>
  );
};

const StyledContainer = styled(Grid)({
  padding: 20,
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

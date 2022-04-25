import { FC } from "react";
import { styled, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";

export const VotedInfo: FC = () => {
  return (
    <StyledContainer>
      <Text variant="body1" align="center">
        You voted yes on this proposal
      </Text>
    </StyledContainer>
  );
};

const StyledContainer = styled("div")({
  backgroundColor: CssVariables.green,
  width: "100%",
  padding: "14px 36px",
  borderRadius: "20px",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

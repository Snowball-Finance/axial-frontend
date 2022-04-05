import { styled } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";

export const CardWrapper = styled("div")({
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

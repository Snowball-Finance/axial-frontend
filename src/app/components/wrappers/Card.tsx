import { styled } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";

export const CardWrapper = styled("div")({
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "26px 36px",
  [mobile]: {
    padding: 15,
  },
});

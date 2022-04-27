import { styled } from "@mui/material";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const SubListTitle = styled("p")({
  textTransform: "uppercase",
  margin: 0,
  marginBottom: "8px",
  fontSize: "12px",
  fontWeight: 600,
  color: CssVariables.commonTextColor,
});

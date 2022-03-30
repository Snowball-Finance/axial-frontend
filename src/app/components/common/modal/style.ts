import { Dialog, styled } from "@mui/material";
import { mobile } from "styles/media";
import { CssVariables } from "../../../../styles/cssVariables/cssVariables";

export const StyledDialog = styled(Dialog)({
  background: "rgba(18, 19, 20, 0.4)",
  ".MuiDialog-paper": {
    maxWidth: "100%",
    backgroundColor: "transparent",
  },
});

export const Wrapper = styled("div")({
  minWidth: "600px",
  background: CssVariables.paperBackground,
  borderRadius: "6px",
  padding: "18px 12px",
  cursor: "auto",

  [mobile]: {
    minWidth: "80vw",
  },
});
export const ChildWrapper = styled("div")({
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  color: CssVariables.commonTextColor,
});

import { Dialog, styled } from "@mui/material"
import { CssVariables } from "../../../../styles/cssVariables/cssVariables"

export const StyledDialog = styled(Dialog)({
  background: "rgba(18, 19, 20, 0.4)",
  backdropFilter: "blur(4px)",
  cursor: "pointer",
  ".MuiDialog-paper": {
    maxWidth: "100%",
    backgroundColor: "transparent",
  },
})

export const Wrapper = styled("div")({
  minWidth: "400px",
  background: CssVariables.white,
  borderRadius: "6px",
  padding: "70px",
  cursor: "auto",
})
export const ChildWrapper = styled("div")({
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  color: CssVariables.darkText,
})

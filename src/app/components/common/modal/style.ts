import { Dialog, styled } from "@mui/material";
import { mobile } from "styles/media";
import { CssVariables } from "../../../../styles/cssVariables/cssVariables";

export const StyledDialog = styled(Dialog)({
  background: CssVariables.modalOverlayBackground,
  ".MuiDialog-paper": {
    maxWidth: "100%",
    backgroundColor: "transparent",
    overflowX: "hidden",

    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: CssVariables.white,
      borderRadius: 8,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: CssVariables.primary,
      borderRadius: 8,
    },
  },
});

export const Wrapper = styled("div")({
  minWidth: "600px",
  background: CssVariables.modalBackground,
  borderRadius: "20px",
  padding: "40px 35px",
  cursor: "auto",
  border: `4px solid ${CssVariables.cardBorder}`,

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

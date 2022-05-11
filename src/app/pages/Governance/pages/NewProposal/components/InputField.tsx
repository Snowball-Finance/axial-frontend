import { styled, TextField } from "@mui/material";

import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";

export const InputField = styled(TextField)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    fontFamily: FontFamilies.IBMPlexSans,
    backgroundColor: CssVariables.swapInputbackground,
    border: `4px solid ${CssVariables.cardBorder}`,
    borderRadius: "20px",

    "&:hover fieldset": {
      borderColor: "transparent",
    },

    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
  ".MuiInputAdornment-root": {
    p: {
      color: CssVariables.white,
    },
  },
});

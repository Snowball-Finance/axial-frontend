import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  direction: "ltr",
  palette: {
    secondary: {
      main: "#d20e42",
    },
    primary: {
      main: "#60A88B",
    },
    action: {
      disabledBackground: "#efefef",
      disabled: "#333333",
    },
  },
});

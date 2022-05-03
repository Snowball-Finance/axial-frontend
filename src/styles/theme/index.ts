import { createTheme } from "@mui/material";
import { FontFamilies } from "styles/cssVariables/cssVariables";

let theme = createTheme({
  direction: "ltr",
  palette: {
    secondary: {
      main: "#d20e42",
    },
    primary: {
      main: "#d15e2c",
    },
    action: {
      disabledBackground: "#efefef",
      disabled: "#333333",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    fontFamily: "Montserrat",
    h2: {
      fontSize: "26px",
      fontFamily: FontFamilies.FugazOne,

      [theme.breakpoints.down("md")]: {
        fontSize: "20px",
      },
    },
    body1: {
      fontSize: "16px",
      fontFamily: FontFamilies.IBMPlexSans,
      fontWeight: "bold",
    },
    body2: {
      fontSize: "16px",
      fontFamily: FontFamilies.IBMPlexSans,
    },
  },
});

export { theme };

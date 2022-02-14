import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans',
    // fontFamily: language === 'ar' ? 'ar' : 'Open Sans',
  },
  // direction: language === 'ar' ? 'rtl' : 'ltr',
  direction: 'ltr',
  palette: {
    secondary: {
      main: '#d20e42',
    },
    primary: {
      main: '#60A88B',
    },
    action: {
      disabledBackground: '#efefef',
      disabled: '#333333'
    }
  },
});


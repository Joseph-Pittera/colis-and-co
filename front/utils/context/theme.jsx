import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        underline: "none",
      },
    },
  },
  status: {
    danger: "#e53e3e",
  },
  palette: {
    mode: "light",
    primary: {
      main: blue[200],
    },
    secondary: {
      main: blue[200],
    },
    customBlue: {
      main: blue[900],
      light: blue[200],
      dark: blue[900],
    },
  },
});

export const colors = {
  primary: blue[200],
  secondary: "#8186A0",
  backgroundLight: "#E8E8E8",
  backgroundDark: "#4F4C6B",
  bodyDark: "#040433",
  bodyLight: "#FAFAFA",
};

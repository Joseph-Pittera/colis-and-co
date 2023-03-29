import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    mode: "light",
    primary: {
      main: blue[200],
    },
    customBlue: {
      main: blue[900],
      light: blue[200],
      dark: blue[900],
    },
  },
});

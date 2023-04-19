import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode) => ({
  overrides: {
    MuiTextField: {
      root: {
        padding: "10px", // Personnalisez la taille de la police selon vos besoins
      },
    },
  },
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
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: blue[200],
          },
          secondary: {
            main: blue[100],
          },
          customBlue: {
            main: blue[900],
            light: blue[200],
            dark: blue[900],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: blue[800],
          },
          secondary: {
            main: blue[800],
          },
          customBlue: {
            main: blue[900],
            light: blue[200],
            dark: blue[900],
          },
        }),
  },
});

export const ToggleColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("colisandcoTheme") || "light"
  );
  const [theme, setTheme] = useState(createTheme(getDesignTokens(mode)));
  const colorMode = () => {
    setMode((c) => (c === "dark" ? "light" : "dark"));
    setTheme((c) => (c = createTheme(getDesignTokens(mode))));
    localStorage.setItem("colisandcoTheme", mode);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};

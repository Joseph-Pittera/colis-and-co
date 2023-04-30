import { createContext, useState, useEffect, ReactNode } from "react";

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
} from "@mui/material";
import { blue } from "@mui/material/colors";

export interface ColorModeContextType {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

interface ToggleColorModeProviderProps {
  children: ReactNode;
}

const getDesignTokens = (mode: "light" | "dark") => ({
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
        root: {
          textDecoration: "none",
        },
        underlineHover: {
          textDecoration: "underline",
        },
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
            main: blue[900],
          },
          secondary: {
            main: blue[800],
          },
          customBlue: {
            main: blue[900],
            light: blue[200],
            dark: blue[900],
          },
          background: {
            default: "#00162c",
            paper: "#00162c",
          },
        }),
  },
});

export const ToggleColorModeProvider = ({
  children,
}: ToggleColorModeProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState("light" as "light" | "dark");
  const [theme, setTheme] = useState(createTheme(getDesignTokens(mode)));

  const colorMode = () => {
    setMode((c) => (c === "dark" ? "light" : "dark"));
    setTheme((c) => (c = createTheme(getDesignTokens(mode))));
    localStorage.setItem("colisandcoTheme", mode);
  };

  useEffect(() => {
    const colorTheme = localStorage.getItem("colisandcoTheme");
    if (colorTheme && (colorTheme === "light" || colorTheme === "dark")) {
      setMode((c) => (c === "dark" ? "light" : "dark"));
      setTheme((c) => (c = createTheme(getDesignTokens(colorTheme))));
      localStorage.setItem("colisandcoTheme", colorTheme);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ColorModeContext.Provider value={{ toggleColorMode: colorMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};

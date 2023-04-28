import { useContext } from "react";

import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { ColorModeContext } from "../../utils/context/theme";
import { ColorModeContextType } from "../../utils/context/theme";

export const ThemeSwitch = () => {
  const theme = useTheme();
  const { toggleColorMode } =
    useContext<ColorModeContextType>(ColorModeContext);
  return (
    <IconButton
      sx={{ mx: 1 }}
      onClick={() => toggleColorMode()}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <LightModeIcon fontSize="small" />
      ) : (
        <DarkModeIcon fontSize="small" />
      )}
    </IconButton>
  );
};

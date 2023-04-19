import { useContext } from "react";

import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { ColorModeContext } from "../../utils/context/theme";

export const ThemeSwitch = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <IconButton
      sx={{ mx: 1, height: 25 }}
      onClick={colorMode}
      color="inherit"
      size="small"
    >
      {theme.palette.mode === "dark" ? (
        <LightModeIcon fontSize="small" sx={{ mx: 1, maxHeight: 25 }} />
      ) : (
        <DarkModeIcon fontSize="small" sx={{ mx: 1, maxHeight: 25 }} />
      )}
    </IconButton>
  );
};

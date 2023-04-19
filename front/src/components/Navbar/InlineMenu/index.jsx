import { Box, Button, IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/router";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ColorModeContext } from "../../../utils/context/theme";

export const InlineMenu = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handleRegister = () => {
    router.push("/register");
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", sm: "flex" },
        justifyContent: "flex-end",
      }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{
          mx: 1,
          display: "block",
          fontWeight: "bold",
          fontSize: "0.7rem",
          backgroundColor: theme.palette.secondary.main,
        }}
        onClick={handleLogin}
      >
        Connexion
      </Button>
      <Button
        variant="contained"
        size="small"
        sx={{
          mx: 1,
          display: "block",
          fontWeight: "bold",
          fontSize: "0.7rem",
          backgroundColor: theme.palette.secondary.main,
        }}
        onClick={handleRegister}
      >
        Inscription
      </Button>
      <IconButton sx={{ ml: 1 }} onClick={colorMode} color="inherit">
        {theme.palette.mode === "dark" ? (
          <LightModeIcon fontSize="small" />
        ) : (
          <DarkModeIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
};

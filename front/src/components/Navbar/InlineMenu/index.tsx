import { useRouter } from "next/router";

import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { ThemeSwitch } from "../../CustomsMuiComp/themeSwitch";

type InlineMenuProps = {
  pages: string[];
  setAnchorElNav: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export const InlineMenu: React.FC<InlineMenuProps> = ({
  pages,
  setAnchorElNav,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const handleLogin = (): void => {
    router.push("/login");
  };
  const handleRegister = (): void => {
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
      <ThemeSwitch />
    </Box>
  );
};

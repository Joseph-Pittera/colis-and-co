import { Box, Button } from "@mui/material";
import { BlueLink } from "../../CustomsMuiComp/BlueLink";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/router";

export const InlineMenu = () => {
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
      <>
        <Button
          variant="contained"
          size="small"
          sx={{
            mx: 1,
            display: "block",
            fontWeight: "bold",
            fontSize: "0.7rem",
            backgroundColor: blue[100],
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
            backgroundColor: blue[100],
          }}
          onClick={handleRegister}
        >
          Inscription
        </Button>
      </>
    </Box>
  );
};

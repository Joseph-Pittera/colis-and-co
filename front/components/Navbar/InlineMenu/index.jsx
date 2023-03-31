import { Box, Button } from "@mui/material";
import { BlueLink } from "../../CustomsMuiComp";

export const InlineMenu = ({ pages, setAnchorElNav }) => {
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "flex-end",
      }}
    >
      {pages.map((page) => (
        <BlueLink href="/connexion">
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{
              py: 2,
              color: "customBlue.dark",
              display: "block",
              fontWeight: "bold",
            }}
          >
            {page}
          </Button>
        </BlueLink>
      ))}
    </Box>
  );
};

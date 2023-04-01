import { Box, Button } from "@mui/material";
import { BlueLink } from "../../CustomsMuiComp/BlueLink";

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
      {pages.map((page, i) => (
        <BlueLink href={`/connexion/${i === 0 ? "login" : "register"}`}>
          <Button
            key={`${page}-${i}}`}
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

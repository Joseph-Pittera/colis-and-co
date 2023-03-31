import { Box } from "@mui/material";
import { Menu, MenuItem, Typography } from "@mui/material";
import { BurgerMenuIcon } from "./BurgerMenuIcon";
import { BlueLink } from "../../CustomsMuiComp";

export const BurgerMenu = ({ pages, anchorElNav, setAnchorElNav }) => {
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "flex-end",
      }}
    >
      <BurgerMenuIcon setAnchorElNav={setAnchorElNav} />
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <BlueLink href="/connexion">
              <Typography
                textAlign="center"
                sx={{
                  my: 2,
                  color: "customBlue.dark",
                  display: "block",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {page}
              </Typography>
            </BlueLink>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

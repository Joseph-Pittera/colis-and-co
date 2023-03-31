import { Menu, MenuItem, Typography } from "@mui/material";
import { BlueLink } from "../../CustomsMuiComp/BlueLink";

export const BurgerMenuList = ({ pages, anchorElNav, setAnchorElNav }) => {
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
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
      {pages.map((page, i) => (
        <MenuItem key={page} onClick={handleCloseNavMenu}>
          <BlueLink href={`/connexion/${i === 0 ? "login" : "register"}`}>
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
  );
};

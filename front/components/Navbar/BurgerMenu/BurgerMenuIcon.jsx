import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const BurgerMenuIcon = ({ setAnchorElNav }) => {
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  return (
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleOpenNavMenu}
      sx={{
        color: "customBlue.dark",
      }}
    >
      <MenuIcon />
    </IconButton>
  );
};

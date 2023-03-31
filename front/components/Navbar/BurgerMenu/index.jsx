import { Box } from "@mui/material";
import { BurgerMenuIcon } from "./BurgerMenuIcon";
import { BurgerMenuList } from "./BurgerMenuList";

export const BurgerMenu = ({ pages, anchorElNav, setAnchorElNav }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "flex-end",
      }}
    >
      <BurgerMenuIcon setAnchorElNav={setAnchorElNav} />
      <BurgerMenuList
        pages={pages}
        anchorElNav={anchorElNav}
        setAnchorElNav={setAnchorElNav}
      />
    </Box>
  );
};

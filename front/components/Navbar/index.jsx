import * as React from "react";
import { Logo } from "./Logo";
import { useScrollTrigger, Slide } from "@mui/material";
import { Tooltip, Button, Avatar, Container } from "@mui/material";
import { AppBar, Box, Toolbar } from "@mui/material";
import { BurgerMenu } from "./BurgerMenu";
import { InlineMenu } from "./InlineMenu";

const pages = ["Connexion", "Inscription"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <HideOnScroll>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo />
            {/* for small screen */}
            <BurgerMenu
              pages={pages}
              anchorElNav={anchorElNav}
              setAnchorElNav={setAnchorElNav}
            />
            {/* for wide screen */}
            <InlineMenu pages={pages} setAnchorElNav={setAnchorElNav} />

            {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

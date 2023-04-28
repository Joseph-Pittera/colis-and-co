import * as React from "react";

import { useScrollTrigger, Slide } from "@mui/material";
import { Container, AppBar, Toolbar } from "@mui/material";

import { Logo } from "./Logo";
import { BurgerMenu } from "./BurgerMenu";
import { InlineMenu } from "./InlineMenu";
import { AvatarMenu } from "./AvatarMenu";
import { AuthContext } from "../../utils/context/auth.tsx";

const pages = ["Connexion", "Inscription"];

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { userData, isLoggedIn } = React.useContext(AuthContext);

  return (
    <HideOnScroll>
      <AppBar position="sticky">
        <Container component="nav" maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: { sm: "56px", md: "60px" } }}
          >
            <Logo />
            {isLoggedIn ? (
              <AvatarMenu
                firstName={userData.user.firstName}
                lastName={userData.user.lastName}
              />
            ) : (
              <>
                {/* for small screen */}
                <BurgerMenu
                  pages={pages}
                  anchorElNav={anchorElNav}
                  setAnchorElNav={setAnchorElNav}
                />
                {/* for wide screen */}
                <InlineMenu pages={pages} setAnchorElNav={setAnchorElNav} />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

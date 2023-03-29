import { ResponsiveAppBar as Navbar } from "./Navbar/Index";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../utils/context/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Main />
      <Footer />
    </ThemeProvider>
  );
};

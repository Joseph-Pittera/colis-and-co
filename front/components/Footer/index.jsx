import { BlueLink } from "../CustomsMuiComp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      display="flex"
      sx={{
        flexDirection: "column",
        alignItems: "center",
      }}
      borderTop={1}
    >
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <p>A propos:</p>
        <BlueLink href="/" underline="hover">
          Mentions légales
        </BlueLink>
        <BlueLink href="/" underline="hover">
          Conditions générales
        </BlueLink>
        <BlueLink href="/" underline="hover">
          Protection des données
        </BlueLink>
      </Box>
      <p>La solution pour toutes vos livraisons</p>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <BlueLink href="https://www.facebook.com/">
          <FacebookIcon sx={{ m: 1 }} />
        </BlueLink>
        <BlueLink href="https://www.instagram.com/">
          <InstagramIcon sx={{ m: 1 }} />
        </BlueLink>
        <BlueLink href="https://www.whatsapp.com/">
          <WhatsAppIcon sx={{ m: 1 }} />
        </BlueLink>
      </Box>
    </Box>
  );
};

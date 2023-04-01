import Box from "@mui/material/Box";
import { BlueLink } from "../../CustomsMuiComp/BlueLink";

export const Logo = () => {
  return (
    <BlueLink href="/">
      <Box
        component="img"
        sx={{
          maxHeight: { xs: 46, md: 60 },
          display: "flex",
          my: 1,
        }}
        alt="Parcel logo of Colis&Co"
        src="/logo_colis&co_dark.png"
      />
    </BlueLink>
  );
};

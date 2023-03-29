import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export const Logo = () => {
  return (
    <Link href="/">
      <Box
        component="img"
        sx={{
          maxHeight: { xs: 46, md: 92 },
          maxWidth: { xs: 60, md: 120 },
          display: "flex",
          mr: 1,
          mb: 1,
        }}
        alt="Parcel logo of Colis&Co"
        src="/logo_colis&co_dark.png"
      />
    </Link>
  );
};

import { Typography } from "@mui/material";

export const Typo = ({ children }) => {
  return (
    <Typography component="p" ml={1} sx={{ fontSize: { xs: 13, sm: 16 } }}>
      {children}
    </Typography>
  );
};

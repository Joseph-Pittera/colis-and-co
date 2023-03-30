import { Button } from "@mui/material";

export const MainButton = ({ children }) => {
  return (
    <Button variant="contained" size="large" sx={{ textTransform: "none" }}>
      {children}
    </Button>
  );
};

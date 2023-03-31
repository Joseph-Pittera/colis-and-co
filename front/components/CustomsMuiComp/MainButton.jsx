import { Button } from "@mui/material";

export const MainButton = ({ children }) => {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        color: "customBlue.dark",
      }}
    >
      {children}
    </Button>
  );
};

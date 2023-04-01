import { Button } from "@mui/material";

export const MainButton = ({
  children,
  size = "large",
  variant = "contained",
}) => {
  return (
    <Button
      variant={variant}
      size={size}
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

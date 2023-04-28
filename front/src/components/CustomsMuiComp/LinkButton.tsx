import { Button, ButtonProps } from "@mui/material";

interface LinkButtonProps extends ButtonProps {
  onClick: () => void;
}

export const LinkButton = ({
  children,
  onClick,
  ...props
}: LinkButtonProps) => {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        display: "block",
        fontSize: "0.7rem",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

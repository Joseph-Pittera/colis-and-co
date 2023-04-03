import { Button } from "@mui/material";
import Link from "next/link";

const ButtonLink = ({ className, href, hrefAs, children }) => (
  <Link href={href} as={hrefAs} legacyBehavior>
    <a className={className}>{children}</a>
  </Link>
);

export const LinkButton = ({
  children,
  size = "large",
  variant = "contained",
  href = "/",
  type = "button",
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
      href={href}
      component={ButtonLink}
      type={type}
    >
      {children}
    </Button>
  );
};

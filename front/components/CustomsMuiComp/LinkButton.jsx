import { Button } from "@mui/material";
import Link from "next/link";

const ButtonLink = ({ className, href, hrefAs, children, prefetch }) => (
  <Link href={href} as={hrefAs} prefetch legacyBehavior>
    <a className={className}>{children}</a>
  </Link>
);

export const LinkButton = ({
  children,
  size = "large",
  variant = "contained",
  href = "/",
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
    >
      {children}
    </Button>
  );
};

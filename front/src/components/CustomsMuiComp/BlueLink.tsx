import Link, { LinkProps } from "next/link";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { Typography } from "@mui/material";

type InternalLinkProps = {
  children: React.ReactNode;
} & LinkProps;

export const BlueLink = styled(({ children, ...rest }: InternalLinkProps) => (
  <Link {...rest}>
    <Typography color="primary" component="span">
      {children}
    </Typography>
  </Link>
))(({ theme }) => ({
  color: blue[900],
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  display: "inline-block",
}));

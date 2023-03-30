// import { Link as MuiLink } from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const BlueLink = styled(Link)(({ theme }) => ({
  color: theme.palette.customBlue.dark,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

// export const FooterLink = ({ href, children, ...props }) => {
//   const classes = useStyles();
//   return (
//     <Link href={href} passHref>
//       <MuiLink className={classes.link} {...props}>
//         {children}
//       </MuiLink>
//     </Link>
//   );
// };

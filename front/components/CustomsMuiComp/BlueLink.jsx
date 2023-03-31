import { styled } from "@mui/material/styles";
import Link from "next/link";

export const BlueLink = styled(Link)(({ theme }) => ({
  color: theme.palette.customBlue.dark,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

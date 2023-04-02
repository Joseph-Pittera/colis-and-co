import { useTheme } from "@mui/material/styles";
import { TextField, useMediaQuery } from "@mui/material";

export function ResponsiveTextField(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return <TextField required size={matches && "small"} {...props} />;
}

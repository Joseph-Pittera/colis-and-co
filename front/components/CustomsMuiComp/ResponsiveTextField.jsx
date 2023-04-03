import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { TextField, useMediaQuery } from "@mui/material";

export function ResponsiveTextField({
  autoComplete,
  type,
  label,
  name,
  props,
  error,
  onChange,
  helperText = "",
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  // const [valeur, setValeur] = useState("");

  // const handleChange = (event) => {
  //   setValeur(event.target.value);
  //   console.log(error);
  // };

  return (
    <TextField
      required
      type={type}
      size={matches && "small"}
      name={name}
      label={label}
      onChange={onChange}
      autoComplete={autoComplete}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
}

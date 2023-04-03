import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { TextField, useMediaQuery } from "@mui/material";

export function ResponsiveTextField({
  autoComplete,
  type,
  label,
  name,
  props,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [valeur, setValeur] = useState("");
  const passwordInput = document.querySelector('input[name="password"]');
  if (passwordInput) {
    console.log(passwordInput.value);
  }
  const handleChange = (event) => {
    setValeur(event.target.value);
  };
  return (
    <TextField
      required
      type={type}
      size={matches && "small"}
      value={valeur}
      name={name}
      label={label}
      onChange={handleChange}
      autoComplete={autoComplete}
      {...props}
    />
  );
}

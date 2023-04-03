import { ResponsiveTextField } from "../CustomsMuiComp/ResponsiveTextField";
import { useState } from "react";

export const PasswordInput = ({ name = "password", label = "Password" }) => {
  const [valeur, setValeur] = useState("");
  const handleChange = (event) => {
    setValeur(event.target.value);
    if (name === "confirm-password") {
    }
  };
  return (
    <ResponsiveTextField
      required
      label={label}
      type="password"
      autoComplete="current-password"
      name={name}
      valeur={valeur}
      onChange={handleChange}
    />
  );
};

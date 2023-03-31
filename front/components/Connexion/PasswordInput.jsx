import { TextField } from "@mui/material";

export const PasswordInput = () => {
  return (
    <TextField
      required
      id="password"
      label="Password"
      type="password"
      autoComplete="current-password"
    />
  );
};

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Login() {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField required id="login" label="Login" />
      <TextField
        required
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <TextField
        required
        id="password-confirmation"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </Box>
  );
}

import * as React from "react";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/utils/context/auth";

import { Button, Typography, InputAdornment, IconButton } from "@mui/material";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useMediaQuery, TextField, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { ConnexionBox } from "@/components/Connexion/ConnexionBox";

export const MainContainer: React.FC = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [connexionToServerError, setConnexionToServerError] = useState(false);
  const [serverDataError, setServerDataError] = useState<Error | null>(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  // handle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  // handle email and password Input changes
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    setValues({ ...values, [input.name]: input.value });
  };

  // handle form submit
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setServerDataError((c) => (c = null));
    setConnexionToServerError((c) => (c = false));
    try {
      //*********************************** PROD *******************************/
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );
      if (!response.ok) {
        setServerDataError(new Error(response.statusText));
        throw new Error(response.statusText);
      }

      const respData = await response.json(); // extraire les données JSON de la réponse
      console.log("respData", respData);
      //*********************************** PROD *******************************/

      login(respData); // add user data to context and local storage
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        if (error.message === "Failed to fetch") {
          setConnexionToServerError((c) => (c = true));
        }
      }
    }
  };

  return (
    <>
      <Typography component="h1" m={4} fontSize={32}>
        Connexion
      </Typography>
      {connexionToServerError && (
        <Alert variant="outlined" severity="error" sx={{ m: "1rem" }}>
          Problème de connexion au serveur, veuillez réessayer plus tard...
        </Alert>
      )}
      {serverDataError && (
        <Alert variant="outlined" severity="error" sx={{ m: "1rem" }}>
          Email ou mot de passe incorrect
        </Alert>
      )}

      <ConnexionBox handleForm={handleForm}>
        <TextField
          label="Email"
          name="email"
          sx={{ m: 1, width: "25ch" }}
          size={matches ? "small" : "medium"}
          onChange={handleChange}
        />
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          size={matches ? "small" : "medium"}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={handleChange}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, maxWidth: 150, textAlign: "center" }}
        >
          Connexion
        </Button>
      </ConnexionBox>
    </>
  );
};

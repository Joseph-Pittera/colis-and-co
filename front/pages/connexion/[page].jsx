import { Layout } from "@/components/Layout";
import { useCallback, useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { ConnexionBox } from "@/components/Connexion/ConnexionBox";
import { LinkButton } from "@/components/CustomsMuiComp/LinkButton";
import { ResponsiveTextField } from "@/components/CustomsMuiComp/ResponsiveTextField";
import { connexionDataValidation } from "@/components/Connexion/connexionDataValidation";
import { useFetch } from "@/utils/hooks";

export default function Connexion({ params }) {
  // determine whether the user is on the login or register page
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((c) => (c === "login" ? "register" : "login"));
  }, []);
  let connexionTxt = variant === "login" ? "Connexion" : "Inscription";
  if (params !== variant) {
    toggleVariant();
  }

  // hangle Input changes
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle password confirmation
  const [error, setError] = useState(null);
  useEffect(() => {
    if (values.passwordConfirm && values.password !== values.passwordConfirm) {
      setError(true);
    } else setError(false);
  }, [values.passwordConfirm]);

  // handle form submit with Data Validation
  const [dataErrors, setDataErrors] = useState(null);
  const [userData, setUserData] = useState(null);
  const handleForm = async (e) => {
    setDataErrors(connexionDataValidation(values));
    console.log("dataErrors", dataErrors);
    console.log("form", e);
    try {
      const response = await fetch(`http://localhost:8000/login`);
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  return (
    <Layout>
      <Typography component="h1" m={4} fontSize={32}>
        {connexionTxt}
      </Typography>
      <Typography component="h5" fontSize={14} color="red">
        {dataErrors &&
          (dataErrors.email ||
            dataErrors.password ||
            dataErrors.password2 ||
            (variant === "register" && dataErrors.passwordConfirm))}
      </Typography>

      <ConnexionBox handleForm={handleForm}>
        <ResponsiveTextField
          label="Email"
          name="email"
          onChange={handleChange}
          error={dataErrors && !!dataErrors.email}
          helperText={dataErrors?.email && "Email incorrect"}
        />
        <ResponsiveTextField
          label="Password"
          name="password"
          type="password"
          error={
            dataErrors && (!!dataErrors.password || !!dataErrors.password2)
          }
          onChange={handleChange}
          helperText={
            (dataErrors?.password || dataErrors?.password2) &&
            "Mot de passe incorrect"
          }
        />
        {variant === "register" && (
          <ResponsiveTextField
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            error={error}
            onChange={handleChange}
            helperText={dataErrors?.passwordConfirm && "Mot de passe incorrect"}
          />
        )}
        <Button
          // href={variant === "register" ? "/registration" : "/"}
          type="submit"
          variant="contained"
          sx={{ mt: 3, maxWidth: 150, textAlign: "center" }}
        >
          {connexionTxt}
        </Button>
        {/* {userData && <p>{userData}</p>} */}
      </ConnexionBox>
    </Layout>
  );
}

export function getStaticPaths() {
  const paths = [
    { params: { page: "login" } },
    { params: { page: "register" } },
  ];

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps(context) {
  const { params } = context;

  return {
    props: {
      params: params.page,
    },
  };
}

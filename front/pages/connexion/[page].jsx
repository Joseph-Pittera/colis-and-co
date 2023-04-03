import { Layout } from "@/components/Layout";
import { useCallback, useState } from "react";
import { Button, Typography } from "@mui/material";
import { ConnexionBox } from "@/components/Connexion/ConnexionBox";
import { PasswordInput } from "@/components/Connexion/PasswordInput";
import { LinkButton } from "@/components/CustomsMuiComp/LinkButton";
import { ResponsiveTextField } from "@/components/CustomsMuiComp/ResponsiveTextField";

export default function Connexion({ params }) {
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((c) => (c === "login" ? "register" : "login"));
  }, []);
  let connexionTxt = variant === "login" ? "Connexion" : "Inscription";

  if (params !== variant) {
    toggleVariant();
  }

  const handleForm = (e) => {
    console.log("form", e);
    // const { data, isLoading, error } = useFetch(
    //   `http://localhost:8000/login`
    // )
  };

  return (
    <Layout>
      <Typography component="h1" m={4} fontSize={32}>
        {connexionTxt}
      </Typography>
      <ConnexionBox handleForm={handleForm}>
        <ResponsiveTextField required label="Email" name="email" />
        <PasswordInput />
        {variant === "register" && (
          <PasswordInput
            name="confirm-password"
            label="Confirm your password"
          />
        )}
        <Button
          // href={variant === "register" ? "/registration" : "/"}
          type="submit"
          variant="contained"
        >
          {connexionTxt}
        </Button>
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

import { Layout } from "@/components/Layout";
import { useCallback, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { ConnexionBox } from "@/components/Connexion/ConnexionBox";
import { PasswordInput } from "@/components/Connexion/PasswordInput";
import { MainButton } from "@/components/Home/HeadCard/MainButton";

export default function Connexion({ params }) {
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((c) => (c === "login" ? "register" : "login"));
  }, []);

  if (params !== variant) {
    toggleVariant();
  }

  let connexionTxt = variant === "login" ? "Connexion" : "Inscription";

  return (
    <Layout>
      <Typography component="h1" m={4} fontSize={32}>
        {connexionTxt}
      </Typography>
      <ConnexionBox>
        <TextField required id="login" label="Email" />
        <PasswordInput />
        {variant === "register" && <PasswordInput />}
      </ConnexionBox>
      <MainButton>{connexionTxt}</MainButton>
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

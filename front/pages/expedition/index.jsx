import { Layout } from "@/components/Layout";
import { useCallback, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { ConnexionBox } from "@/components/Connexion/ConnexionBox";
import { PasswordInput } from "@/components/Connexion/PasswordInput";
import { LinkButton } from "@/components/CustomsMuiComp/LinkButton";
import Link from "next/link";

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
      <Link href="/">
        <LinkButton>{connexionTxt}</LinkButton>
      </Link>
    </Layout>
  );
}

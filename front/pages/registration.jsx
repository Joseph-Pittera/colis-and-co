import { Layout } from "@/components/Layout";
import { TextField, Typography, Stack, Box } from "@mui/material";
import { ConnexionBox } from "@/components/Connexion/ConnexionBox";
import { MainButton } from "@/components/CustomsMuiComp/MainButton";
import Link from "next/link";
import { connexionDatas } from "@/components/Connexion/ConnexionDatas";

export default function Registration() {
  const Typo = ({ children }) => {
    return (
      <Typography component="p" ml={1} fontSize={16}>
        {children}
      </Typography>
    );
  };

  return (
    <Layout>
      <Typography component="h1" m={4} fontSize={32} textAlign="center">
        Formulaire d'inscription
      </Typography>
      <ConnexionBox>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="column"
            m={1}
            sx={{ minWidth: "20rem", maxWidth: "30rem", width: "45%" }}
          >
            <Typo>Nom :</Typo>
            <TextField required placeholder="Nom" sx={{ maxWidth: "16rem" }} />
            <Typo>Prénom :</Typo>
            <TextField
              required
              placeholder="Prénom"
              sx={{ maxWidth: "16rem" }}
            />
            <Typo>Date de naissance :</Typo>
            <TextField required type="date" sx={{ maxWidth: "16rem" }} />
            <Typo>Téléphone :</Typo>
            <TextField
              required
              placeholder="Téléphone"
              type="tel"
              sx={{ maxWidth: "16rem" }}
            />
          </Stack>
          <Stack
            direction="column"
            m={1}
            sx={{ minWidth: "20rem", maxWidth: "30rem", width: "45%" }}
          >
            <Typo>Adresse :</Typo>
            <TextField required placeholder="Adresse" />
            <Typo>Complément d'adresse :</Typo>
            <TextField placeholder="Adresse2" />
            <Stack direction="row">
              <Stack direction="column">
                <Typo>Ville :</Typo>
                <TextField required placeholder="Ville" />
              </Stack>
              <Stack direction="column">
                <Typo>Code postal :</Typo>
                <TextField required placeholder="Code postal" />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </ConnexionBox>
      <Stack spacing={2} direction="row">
        <Link href="/">
          <MainButton>Valider</MainButton>
        </Link>
        <Link href="/">
          <MainButton>Annuler</MainButton>
        </Link>
      </Stack>
    </Layout>
  );
}

{
  /* {connexionDatas.map((data, i) => (
            <Stack
              key={`${data}-${i}`}
              direction="column"
              m={1}
              sx={{ maxWidth: "30rem" }}
            >
              <Typo>{data.text} :</Typo>
              {data.name !== "birth" ? (
                <TextField
                  required
                  placeholder={data.placeholder ? data.placeholder : ""}
                  type={data.type}
                  sx={{ maxWidth: data.maxWidth }}
                  name={data.name}
                />
              ) : (
                <TextField
                  required
                  placeholder={data.placeholder ? data.placeholder : ""}
                  type={data.type}
                  sx={{
                    maxWidth: data.maxWidth,
                    "& input": { minWidth: "12rem", maxWidth: data.maxWidth },
                  }}
                  name={data.name}
                />
              )}
            </Stack>
          ))} */
}

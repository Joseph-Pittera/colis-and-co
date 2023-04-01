import { Layout } from "@/components/Layout";
import { Typo } from "@/components/CustomsMuiComp/LabelTypo";
import { Typography, Stack, Box } from "@mui/material";
import { ConnexionBox } from "@/components/Connexion/ConnexionBox";
import { LinkButton } from "@/components/CustomsMuiComp/LinkButton";
import { ResponsiveTextField } from "@/components/CustomsMuiComp/ResponsiveTextField";

export default function Registration() {
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
            <ResponsiveTextField
              required
              placeholder="Nom"
              sx={{ maxWidth: "16rem" }}
            />
            <Typo>Prénom :</Typo>
            <ResponsiveTextField
              required
              placeholder="Prénom"
              sx={{ maxWidth: "16rem" }}
            />
            <Typo>Date de naissance :</Typo>
            <ResponsiveTextField
              required
              type="date"
              sx={{ maxWidth: "16rem" }}
            />
            <Typo>Téléphone :</Typo>
            <ResponsiveTextField
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
            <ResponsiveTextField required placeholder="Adresse" />
            <Typo>Complément d'adresse :</Typo>
            <ResponsiveTextField placeholder="Adresse2" />
            <Stack direction="row">
              <Stack direction="column">
                <Typo>Ville :</Typo>
                <ResponsiveTextField required placeholder="Ville" />
              </Stack>
              <Stack direction="column">
                <Typo>Code postal :</Typo>
                <ResponsiveTextField required placeholder="Code postal" />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </ConnexionBox>
      <Stack spacing={2} direction="row">
        <LinkButton href="/">Valider</LinkButton>
        <LinkButton href="/">Annuler</LinkButton>
      </Stack>
    </Layout>
  );
}

import { Layout } from "@/components/Layout";
import { Typography } from "@mui/material";
import { LinkButton } from "@/components/CustomsMuiComp/LinkButton";
import { ExpeditionForm } from "@/components/Expedition/ExpeditionForm";
import { ObjectInfosBox } from "@/components/Expedition/ObjectInfosBox";
import { SizeForm } from "@/components/Expedition/SizeForm";
import { PlaceInfosBox } from "@/components/Expedition/PlaceInfosBox";

export default function CreateExpedition({ params }) {
  return (
    <Layout>
      <Typography component="h1" m={4} fontSize={32} textAlign="center">
        Formulaire d'expédition
      </Typography>
      <ExpeditionForm>
        <ObjectInfosBox />
        <SizeForm />
        <PlaceInfosBox />
      </ExpeditionForm>
      <LinkButton href="/">Publier la course</LinkButton>
    </Layout>
  );
}

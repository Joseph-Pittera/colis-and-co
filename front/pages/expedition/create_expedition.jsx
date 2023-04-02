import { Layout } from "@/components/Layout";
import { Typography } from "@mui/material";
import { LinkButton } from "@/components/CustomsMuiComp/LinkButton";
import { ExpeditionForm } from "@/components/Expedition/ExpeditionForm";
import { ObjectInfosBox } from "@/components/Expedition/ObjectInfosBox";
import { SizeInfosBox } from "@/components/Expedition/SizeInfosBox";
import { PlaceInfosBox } from "@/components/Expedition/PlaceInfosBox";
import { PriceBox } from "@/components/Expedition/PriceBox";
import { Map } from "@/components/Expedition/Map";

export default function CreateExpedition({ params }) {
  const center = { lat: 46.227638, lng: 2.213749 };
  const zoom = 5.5;
  return (
    <Layout>
      <Typography component="h1" m={4} fontSize={32} textAlign="center">
        Formulaire d'expédition
      </Typography>
      <ExpeditionForm>
        <ObjectInfosBox />
        <SizeInfosBox />
        <PlaceInfosBox />
        <PriceBox />
        <Map center={center} zoom={zoom} />
      </ExpeditionForm>
      <LinkButton href="/">Publier la course</LinkButton>
    </Layout>
  );
}

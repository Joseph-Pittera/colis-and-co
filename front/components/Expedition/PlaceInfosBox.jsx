import React from "react";
import { Stack } from "@mui/material";
import { Typo } from "../CustomsMuiComp/LabelTypo";
import { FormSubBox } from "./FormSubBox";
import { ResponsiveTextField } from "../CustomsMuiComp/ResponsiveTextField";

export const PlaceInfosBox = () => {
  return (
    <FormSubBox>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <Stack>
          <Typo>Adresse de départ :</Typo>
          <ResponsiveTextField
            placeholder="1 Avenue des Champs-Elysée, 75008 PARIS﻿"
            sx={{ width: { xs: "12rem", md: "20rem" } }}
          />
        </Stack>
        <Stack>
          <Typo>Téléphone du contact pour la prise en charge :</Typo>
          <ResponsiveTextField
            placeholder="06 01 02 03 04"
            type="tel"
            sx={{ width: "12rem" }}
          />
        </Stack>
      </Stack>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <Stack>
          <Typo>Adresse d'arrivée :</Typo>
          <ResponsiveTextField
            placeholder="1 Avenue des Champs-Elysée, 75008 PARIS﻿"
            sx={{ width: { xs: "12rem", md: "20rem" } }}
          />
        </Stack>
        <Stack>
          <Typo>Téléphone du contact pour la livraison :</Typo>
          <ResponsiveTextField
            placeholder="06 01 02 03 04"
            type="tel"
            sx={{ width: "12rem" }}
          />
        </Stack>
      </Stack>
    </FormSubBox>
  );
};

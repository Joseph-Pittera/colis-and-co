import React from "react";
import { Stack, TextField } from "@mui/material";
import { Typo } from "../CustomsMuiComp/LabelTypo";
import { FormSubBox } from "./FormSubBox";
import { ResponsiveTextField } from "../CustomsMuiComp/ResponsiveTextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// function ResponsiveTextField(props) {
//   const theme = useTheme();
//   const matches = useMediaQuery(theme.breakpoints.down("sm"));

//   return <TextField size={matches && "small"} {...props} />;
// }
export const PlaceInfosBox = () => {
  return (
    <FormSubBox>
      <Stack m={1} sx={{ minWidth: "20rem", maxWidth: "50rem" }}>
        <Stack direction="row" flexWrap="wrap" my={1}>
          <Stack mx={2}>
            <Typo>Adresse de départ :</Typo>
            <ResponsiveTextField
              required
              placeholder="1 Avenue des Champs-Elysée, 75008 PARIS﻿"
              sx={{ width: { xs: "12rem", md: "20rem" } }}
            />
          </Stack>
          <Stack mx={2}>
            <Typo>Téléphone du contact pour la prise en charge :</Typo>
            <ResponsiveTextField
              required
              placeholder="06 01 02 03 04"
              type="tel"
              sx={{ width: "12rem" }}
            />
          </Stack>
        </Stack>
        <Stack direction="row" flexWrap="wrap" my={1}>
          <Stack mx={2}>
            <Typo>Adresse d'arrivée :</Typo>
            <ResponsiveTextField
              required
              placeholder="1 Avenue des Champs-Elysée, 75008 PARIS﻿"
              sx={{ width: { xs: "12rem", md: "20rem" } }}
            />
          </Stack>
          <Stack mx={2}>
            <Typo>Téléphone du contact pour la livraison :</Typo>
            <ResponsiveTextField
              required
              placeholder="06 01 02 03 04"
              type="tel"
              sx={{ width: "12rem" }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormSubBox>
  );
};

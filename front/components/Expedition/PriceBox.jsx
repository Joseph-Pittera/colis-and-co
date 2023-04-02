import React from "react";
import { Stack } from "@mui/material";
import { FormSubBox } from "./FormSubBox";
import { Typo } from "../CustomsMuiComp/LabelTypo";
import { ResponsiveTextField } from "../CustomsMuiComp/ResponsiveTextField";

export const PriceBox = () => {
  return (
    <FormSubBox>
      <Typo>Indiquer le prix proposé pour la prestation (en euros) :</Typo>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <ResponsiveTextField placeholder="Prix en €" sx={{ width: "8rem" }} />
      </Stack>
    </FormSubBox>
  );
};

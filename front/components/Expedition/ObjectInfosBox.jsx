import React from "react";
import { Stack } from "@mui/material";
import { Typo } from "../CustomsMuiComp/LabelTypo";
import { FormSubBox } from "./FormSubBox";
import { ResponsiveTextField } from "../CustomsMuiComp/ResponsiveTextField";

export const ObjectInfosBox = () => {
  return (
    <FormSubBox>
      <Stack>
        <Typo>Objet :</Typo>
        <ResponsiveTextField
          placeholder="livres, canapé..."
          sx={{ maxWidth: "36rem" }}
        />
      </Stack>
      <Stack direction="row">
        <Stack>
          <Typo>Quantité :</Typo>
          <ResponsiveTextField
            placeholder="1"
            type="number"
            inputProps={{
              min: 0,
            }}
            sx={{ maxWidth: "16rem" }}
          />
        </Stack>
        <Stack>
          <Typo>Poids (en kg) :</Typo>
          <ResponsiveTextField
            placeholder="0.1"
            type="number"
            inputProps={{
              min: 0,
              step: 0.1,
            }}
            sx={{ maxWidth: "16rem" }}
          />
        </Stack>
      </Stack>
    </FormSubBox>
  );
};

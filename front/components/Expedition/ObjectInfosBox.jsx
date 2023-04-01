import React from "react";
import { Stack, Select, MenuItem, InputLabel } from "@mui/material";
import { Typo } from "../CustomsMuiComp/LabelTypo";
import { FormSubBox } from "./FormSubBox";
import { ResponsiveTextField } from "../CustomsMuiComp/ResponsiveTextField";

export const ObjectInfosBox = () => {
  const [size, setSize] = React.useState("");

  const handleChange = (event) => {
    setSize(event.target.value);
  };
  return (
    <FormSubBox>
      <Stack m={1} sx={{ minWidth: "20rem", maxWidth: "50rem" }}>
        <Stack mx={2}>
          <Typo>Objet :</Typo>
          <ResponsiveTextField
            required
            placeholder="livres, canapé..."
            sx={{ maxWidth: "36rem" }}
          />
        </Stack>
        <Stack direction="row">
          <Stack mx={2}>
            <Typo>Quantité :</Typo>
            <ResponsiveTextField
              required
              placeholder="1"
              type="number"
              inputProps={{
                min: 0,
              }}
              sx={{ maxWidth: "16rem" }}
            />
          </Stack>
          <Stack mx={2}>
            <Typo>Poids total (en kg) :</Typo>
            <ResponsiveTextField
              required
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
      </Stack>
    </FormSubBox>
  );
};

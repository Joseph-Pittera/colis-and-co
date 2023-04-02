import React from "react";
import { Stack } from "@mui/material";
import { FormSubBox } from "./FormSubBox";
import { Typo } from "../CustomsMuiComp/LabelTypo";
import { ResponsiveTextField } from "../CustomsMuiComp/ResponsiveTextField";

export const SizeInfosBox = () => {
  return (
    <FormSubBox>
      <Typo>Dimensions (en cm) :</Typo>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <ResponsiveTextField label="Longueur" sx={{ width: "8rem" }} />
        <ResponsiveTextField label="Largeur" sx={{ width: "8rem" }} />
        <ResponsiveTextField label="Hauteur" sx={{ width: "8rem" }} />
      </Stack>
    </FormSubBox>
  );
};
{
  /* <Stack mx={2}>
          <Typo>Taille :</Typo>
          <Select
            id="demo-simple-select"
            value={size}
            label="none"
            onChange={handleChange}
            sx={{ maxWidth: "36rem", m: 1 }}
          >
            <MenuItem value="S">
              S - Tient dans une boîte à chaussures (téléphone, clés, doudou...)
            </MenuItem>
            <MenuItem value="M">
              M - Tient dans une valise cabine (ordinateur, caisse de vin,
              platine vinyle…)
            </MenuItem>
            <MenuItem value="L">
              L - Environ 4 petites valises cabine (tableau, télévision, lit
              parapluie...)
            </MenuItem>
            <MenuItem value="XL">
              XL - Tient dans un break ou un monospace (commode, fauteuil, table
              basse…)
            </MenuItem>
            <MenuItem value="XXL">
              XXL - Nécessite un petit utilitaire (scooter, armoire, canapé,
              lit…)
            </MenuItem>
          </Select>{" "}
        </Stack> */
}

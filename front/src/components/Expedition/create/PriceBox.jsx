import React from "react";
import { Controller } from "react-hook-form";

import { Stack } from "@mui/material";

import { FormSubBox } from "./FormSubBox";
import { Typo } from "../../CustomsMuiComp/LabelTypo";
import { ResponsiveTextField } from "../../CustomsMuiComp/ResponsiveTextField";

export const PriceBox = ({ control, errors }) => {
  return (
    <FormSubBox>
      <Typo>Indiquer le prix proposé pour la prestation (en euros) :</Typo>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <Controller
          name="price"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            <ResponsiveTextField
              {...field}
              type={"number"}
              placeholder="Prix en €"
              sx={{ width: "8rem" }}
              helperText={errors?.price ? errors?.price?.message : ""}
              error={errors?.price ? true : false}
            />
          )}
        />
      </Stack>
    </FormSubBox>
  );
};

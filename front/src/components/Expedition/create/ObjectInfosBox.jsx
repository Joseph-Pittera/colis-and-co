import React from "react";
import { Controller } from "react-hook-form";

import { Stack } from "@mui/material";

import { Typo } from "../../CustomsMuiComp/LabelTypo";
import { FormSubBox } from "./FormSubBox";
import { ResponsiveTextField } from "../../CustomsMuiComp/ResponsiveTextField";

export const ObjectInfosBox = ({ control, errors }) => {
  return (
    <FormSubBox>
      <Stack>
        <Typo>Objet :</Typo>

        <Controller
          name="type_of_marchandise"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ResponsiveTextField
              {...field}
              placeholder="livres, canapé..."
              sx={{ maxWidth: "36rem" }}
              helperText={
                errors?.type_of_marchandise
                  ? errors?.type_of_marchandise?.message
                  : ""
              }
              error={errors?.type_of_marchandise ? true : false}
            />
          )}
        />
      </Stack>
      <Stack direction="row">
        <Stack>
          <Typo>Quantité :</Typo>
          <Controller
            name="quantity"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <ResponsiveTextField
                {...field}
                placeholder="1"
                type="number"
                sx={{ maxWidth: "16rem" }}
                helperText={errors?.quantity ? errors?.quantity?.message : ""}
                error={errors?.quantity ? true : false}
              />
            )}
          />
        </Stack>
        <Stack>
          <Typo>Poids (en kg) :</Typo>
          <Controller
            name="weight"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <ResponsiveTextField
                {...field}
                placeholder="0.1"
                type="number"
                sx={{ maxWidth: "16rem" }}
                helperText={errors?.weight ? errors?.weight?.message : ""}
                error={errors?.weight ? true : false}
              />
            )}
          />
        </Stack>
      </Stack>
    </FormSubBox>
  );
};

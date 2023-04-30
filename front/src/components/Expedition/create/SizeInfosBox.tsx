import React from "react";
import { Controller, Control } from "react-hook-form";

import { useTheme } from "@mui/material/styles";
import { Stack, TextField, useMediaQuery } from "@mui/material";

import { FormSubBox } from "./FormSubBox";
import { Typo } from "../../CustomsMuiComp/LabelTypo";

interface SizeInfosBoxProps {
  control: Control<any>;
  errors: Record<string, any>;
}

export const SizeInfosBox: React.FC<SizeInfosBoxProps> = ({
  control,
  errors,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <FormSubBox>
      <Typo>Dimensions (en cm) :</Typo>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <Controller
          name="length"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Longueur"
              sx={{ width: "8rem" }}
              size={matches ? "small" : "medium"}
              helperText={errors?.length ? errors?.length?.message : ""}
              error={errors?.length ? true : false}
            />
          )}
        />
        <Controller
          name="width"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Largeur"
              sx={{ width: "8rem" }}
              size={matches ? "small" : "medium"}
              helperText={errors?.width ? errors?.width?.message : ""}
              error={errors?.width ? true : false}
            />
          )}
        />
        <Controller
          name="height"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Hauteur"
              sx={{ width: "8rem" }}
              size={matches ? "small" : "medium"}
              helperText={errors?.height ? errors?.height?.message : ""}
              error={errors?.height ? true : false}
            />
          )}
        />
      </Stack>
    </FormSubBox>
  );
};

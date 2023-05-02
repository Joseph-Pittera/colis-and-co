import * as React from "react";
import { Controller, Control } from "react-hook-form";

import { Stack, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { FormSubBox } from "./FormSubBox";
import { Typo } from "../../CustomsMuiComp/LabelTypo";

interface PriceBoxProps {
  control: Control<any>;
  errors: Record<string, any>;
}

export const PriceBox: React.FC<PriceBoxProps> = ({ control, errors }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <FormSubBox>
      <Typo>Indiquer le prix proposé pour la prestation (en euros) :</Typo>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <Controller
          name="price"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              type={"number"}
              placeholder="Prix en €"
              sx={{ width: "8rem" }}
              size={matches ? "small" : "medium"}
              helperText={errors?.price ? errors?.price?.message : ""}
              error={errors?.price ? true : false}
            />
          )}
        />
      </Stack>
    </FormSubBox>
  );
};

import { Box, BoxProps } from "@mui/material";
import React from "react";

interface SearchFormProps extends Omit<BoxProps, "onSubmit"> {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const SearchForm = ({
  children,
  onSubmit,
  ...rest
}: SearchFormProps) => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        pt: 2,
        mb: 4,
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      {...rest}
    >
      {children}
    </Box>
  );
};

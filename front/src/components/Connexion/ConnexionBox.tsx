import Box, { BoxProps } from "@mui/material/Box";
import { FormEvent, ReactNode } from "react";

type ConnexionBoxProps = {
  children: ReactNode;
  handleForm: (e: FormEvent<HTMLFormElement>) => void;
} & BoxProps;

export const ConnexionBox = ({
  children,
  handleForm,
  ...rest
}: ConnexionBoxProps) => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
        pt: 2,
        mb: 4,
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleForm(e);
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

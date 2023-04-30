import { Box, BoxProps } from "@mui/material";

interface ExpeditionFormProps extends Omit<BoxProps, "onSubmit"> {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

export const ExpeditionForm: React.FC<ExpeditionFormProps> = ({
  children,
  onSubmit,
  ...rest
}) => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
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

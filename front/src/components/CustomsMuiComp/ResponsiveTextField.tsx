import { useTheme } from "@mui/material/styles";
import { TextField, useMediaQuery, TextFieldProps } from "@mui/material";

interface ResponsiveTextFieldProps extends Omit<TextFieldProps, "size"> {
  type: string;
  label: string;
  name: string;
  error: boolean;
  helperText?: string;
  placeholder?: string;
}

export function ResponsiveTextField(props: ResponsiveTextFieldProps) {
  const {
    type,
    label,
    name,
    error,
    onChange,
    helperText = "",
    placeholder = "",
    sx,
    ...rest
  } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TextField
      sx={sx}
      required
      type={type}
      size={matches ? "small" : "medium"}
      name={name}
      label={label}
      onChange={onChange}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      {...rest}
    />
  );
}

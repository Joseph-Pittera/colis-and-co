import { ResponsiveTextField } from "../CustomsMuiComp/ResponsiveTextField";

export const PasswordInput = () => {
  return (
    <ResponsiveTextField
      required
      id="password"
      label="Password"
      type="password"
      autoComplete="current-password"
    />
  );
};

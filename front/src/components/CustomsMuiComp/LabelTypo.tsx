import { Typography, TypographyProps } from "@mui/material";
import { forwardRef } from "react";

interface TypoProps extends TypographyProps {
  ml?: number;
}

export const Typo = forwardRef<HTMLParagraphElement, TypoProps>(
  (props, ref) => {
    const { children, ml = 1, ...rest } = props;
    return (
      <Typography
        component="p"
        ml={ml}
        sx={{ fontSize: { xs: 15, sm: 16 } }}
        {...rest}
        ref={ref}
      >
        {children}
      </Typography>
    );
  }
);

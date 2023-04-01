import React from "react";
import { Box, useTheme } from "@mui/material";

export const FormSubBox = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "5px",
        marginBottom: "1rem",
        padding: "1rem",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        maxWidth: "50rem",
      }}
    >
      {children}
    </Box>
  );
};

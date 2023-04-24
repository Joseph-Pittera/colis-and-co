import React from "react";
import { Box, ListItem, useTheme } from "@mui/material";

export const ListSubBox = ({ children }) => {
  const theme = useTheme();
  return (
    <ListItem
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      sx={{
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "5px",
        mb: "1rem",
        mx: "1rem",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        padding: "1rem",
        flexWrap: "wrap",
        width: { xs: "90%", sm: 500, md: 660 },
      }}
    >
      {children}
    </ListItem>
  );
};

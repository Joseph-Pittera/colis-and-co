import React from "react";
import { ListItem, useTheme } from "@mui/material";

interface ListSubBoxProps {
  children: React.ReactNode;
}

export const ListSubBox: React.FC<ListSubBoxProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <ListItem
      sx={{
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "5px",
        mb: "1rem",
        mx: "auto",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        padding: "1rem",
        flexWrap: "wrap",
        width: { xs: "90%", sm: 500, md: 660 },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
      }}
    >
      {children}
    </ListItem>
  );
};

import { useState } from "react";

import { Box } from "@mui/material";

import { BottomCards } from "./BottomCards";
import YouAreBtn from "./YouAreBtn";

export const BottomSection = () => {
  const [youAre, setYouAre] = useState("expeditor");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
    >
      <YouAreBtn youAre={youAre} setYouAre={setYouAre} />
      <BottomCards youAre={youAre} />
    </Box>
  );
};

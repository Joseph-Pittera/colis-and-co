import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState } from "react";

type YouAreBtnProps = {
  youAre: "expeditor" | "deliverer";
  setYouAre: React.Dispatch<React.SetStateAction<"expeditor" | "deliverer">>;
};

export default function YouAreBtn({ youAre, setYouAre }: YouAreBtnProps) {
  const [isOutlined, setIsOutlined] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOutlined(!isOutlined);
    const target = e.target as HTMLElement;
    if (
      (target.textContent === "Expéditeur" && youAre === "deliverer") ||
      (target.textContent === "Livreur" && youAre === "expeditor")
    ) {
      setYouAre((c) => {
        return c === "expeditor" ? "deliverer" : "expeditor";
      });
    }
  };

  return (
    <ButtonGroup disableElevation>
      <Button
        id="expeditor-btn"
        onClick={handleClick}
        sx={{ width: 120 }}
        variant={isOutlined ? "outlined" : "contained"}
      >
        Expéditeur
      </Button>
      <Button
        id="deliverer-btn"
        onClick={handleClick}
        sx={{ width: 120 }}
        variant={isOutlined ? "contained" : "outlined"}
      >
        Livreur
      </Button>
    </ButtonGroup>
  );
}

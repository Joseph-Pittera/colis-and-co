import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function YouAreBtn({ youAre, setYouAre }) {
  const toggleYouAre = (e) => {
    if (
      (e.target.textContent === "Expéditeur" && youAre === "deliverer") ||
      (e.target.textContent === "Livreur" && youAre === "expeditor")
    ) {
      setYouAre((c) => {
        return c === "expeditor" ? "deliverer" : "expeditor";
      });
    }
  };

  return (
    <ButtonGroup variant="outlined">
      <Button onClick={toggleYouAre} sx={{ width: 120 }}>
        Expéditeur
      </Button>
      <Button onClick={toggleYouAre} sx={{ width: 120 }}>
        Livreur
      </Button>
    </ButtonGroup>
  );
}

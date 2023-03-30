import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function YouAreBtn({ youAre, setYouAre }) {
  const toggleYouAre = (e) => {
    console.log(e.target.textContent);
    if (
      (e.target.textContent === "Expéditeur" && youAre === "deliverer") ||
      (e.target.textContent === "Livreur" && youAre === "expeditor")
    ) {
      setYouAre((c) => {
        console.log(c);
        return c === "expeditor" ? "deliverer" : "expeditor";
      });
    }
  };

  return (
    <ButtonGroup
      disableElevation
      variant="outlined"
      aria-label="Disabled elevation buttons"
    >
      <Button onClick={toggleYouAre}>Expéditeur</Button>
      <Button onClick={toggleYouAre}>Livreur</Button>
    </ButtonGroup>
  );
}

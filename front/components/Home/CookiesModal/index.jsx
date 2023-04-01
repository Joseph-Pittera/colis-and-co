import * as React from "react";
import { Box, Button, Typography, Modal, Stack } from "@mui/material";
import { LinkButton } from "@/components/CustomsMuiComp/LinkButton";
import Link from "next/link";

const btnTxt = ["Cookies nécessaires uniquement", "Autoriser tous les cookies"];

const style = {
  position: "absolute",
  bottom: "0",
  left: "50%",
  transform: "translate(-50%, -10%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "1px solid #00000075",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export function CookiesModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Modale de Cookies</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Cookies preferences"
        aria-describedby="Choice of cookies preferences"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Ce site web utilise des cookies
          </Typography>
          <Typography sx={{ mt: 2 }} component="p" fontSize={12}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio quod
            recusandae veritatis quaerat ab dolores est, vitae corrupti
            voluptas? Harum sed aut deserunt quibusdam culpa quo quod
            consectetur corporis recusandae neque maiores quos, adipisci
            provident ipsam ullam architecto sequi alias cum atque excepturi
            facilis velit odit modi perferendis. Fuga, ex.
          </Typography>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            mt={2}
          >
            {btnTxt.map((txt, i) => (
              <LinkButton key={i} size="small">
                {txt}
              </LinkButton>
            ))}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

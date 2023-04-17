import * as React from "react";
import { Box, Typography, Modal, Stack } from "@mui/material";
import { LinkButton } from "@/components/CustomsMuiComp/LinkButton";

const style = {
  position: "absolute",
  bottom: "0",
  left: "50%",
  transform: "translate(-50%, -10%)",
  width: "90%",
  maxWidth: "500px",
  bgcolor: "background.paper",
  border: "1px solid #00000075",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export function CookiesModal({ isOpen, onRequestClose, onAccept }) {
  return (
    <div>
      <Modal
        open={isOpen}
        onRequestClose={onRequestClose}
        aria-labelledby="Cookies preferences"
        aria-describedby="Choice of cookies preferences"
      >
        <Box sx={style}>
          <Typography variant="h5" component="h2">
            Politique de cookies
          </Typography>
          <Typography sx={{ mt: 2 }} component="p" fontSize={16}>
            Nous utilisons des cookies pour améliorer votre expérience
            utilisateur.
          </Typography>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            mt={2}
          >
            <LinkButton onClick={onAccept} size="small">
              Accepter
            </LinkButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

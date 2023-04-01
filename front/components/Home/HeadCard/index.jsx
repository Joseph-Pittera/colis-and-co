import { Box, Stack, Card, CardContent, Typography } from "@mui/material";
import { MainButton } from "../../CustomsMuiComp/MainButton";

const titles = [
  ["Livraisons fiables", "h1", 32],
  ["&", "h2", 18],
  ["économiques entre particuliers à travers la France", "h3", 16],
];
const btnTxt = ["Je propose un envoi", "Je suis transporteur"];

export const HeadCard = () => {
  return (
    <Card
      sx={{
        p: { xs: 3, md: 6 },
        my: 3,
        mx: "auto",
        boxShadow: {
          xs: "none",
          sm: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
        },
        width: "90%",
        textAlign: "center",
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
        }}
      >
        <Box mb={8}>
          {titles.map((title, i) => (
            <Typography
              key={i}
              component={title[1]}
              fontSize={title[2]}
              marginBottom={1}
            >
              {title[0]}
            </Typography>
          ))}
        </Box>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
        >
          {btnTxt.map((txt, i) => (
            <MainButton key={i}>{txt}</MainButton>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

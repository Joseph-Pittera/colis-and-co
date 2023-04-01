import { Box, Stack, Card, CardContent, Typography } from "@mui/material";
import { LinkButton } from "../../CustomsMuiComp/LinkButton";
import { BlueLink } from "@/components/CustomsMuiComp/BlueLink";
import Link from "next/link";

const titles = [
  ["Livraisons fiables", "h1", 32],
  ["&", "h2", 18],
  ["économiques entre particuliers à travers la France", "h3", 16],
];
const btnTxt = [
  { text: "Je propose un envoi", href: "/expedition" },
  { text: "Je suis transporteur", href: "/connexion/login" },
];

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
          {btnTxt.map((btn, i) => (
            <LinkButton key={`${btn}-${i}`} href={btn.href}>
              {btn.text}
            </LinkButton>

            // <Button key={i} component={LinkButton} href={btn.href}>
            //   {btn.text}
            // </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

import { Typography } from "@mui/material";

type TitleTypoProps = [
  text: string,
  tag: keyof JSX.IntrinsicElements,
  size: number
];

export const TitleTypo = ([text, tag, size]: TitleTypoProps) => {
  return (
    <Typography component={tag} fontSize={size}>
      {text}
    </Typography>
  );
};

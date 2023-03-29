import styled from "styled-components";
import { colors } from "@/utils/context/theme";
import Link from "next/link";

const FooterComp = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Footer = () => {
  return (
    <FooterComp>
      A propos:
      <Link href="/">Mentions légales</Link>
      <Link href="/">Conditions générales</Link>
      <Link href="/">Protection des données</Link>
    </FooterComp>
  );
};

import { Icons } from "../Icons/Icons";
import { H1, LogoContainer } from "./styles";
import { Mulish } from "next/font/google";
const mulish = Mulish({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export function Logo() {
  return (
    <LogoContainer className="logo">
      <Icons.Logo />
      <H1 className={mulish.className}>Bikube</H1>
    </LogoContainer>
  );
}

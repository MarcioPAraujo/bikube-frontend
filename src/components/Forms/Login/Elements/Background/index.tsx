import { ReactNode } from "react";
import { Container, LoginBackground } from "./styles";
import Image from "next/image";

type BackgroundProps = {
  children: ReactNode;
  onSubmit: () => void;
};
const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Image
        src="/images/login_background.png"
        alt="Background"
        quality={100}
        priority
        fill
        style={{ objectFit: "cover", zIndex: -1 }}
      />
      {children}
    </Container>
  );
};
export function FormBackground({ children, onSubmit }: BackgroundProps) {
  return (
    <Background>
      <LoginBackground onSubmit={onSubmit}>{children}</LoginBackground>
    </Background>
  );
}

'use client';

import Image from 'next/image';
import { BackgroundImage, Container, ImageContainer, TextImageContainer, Title } from './layoutStyles';
import { Orbitron } from 'next/font/google';

interface IChildren {
  children: React.ReactNode;
}

const orbitron = Orbitron({
  weight: ['900'],
  subsets: ['latin'],
});

const LoginLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <Container>
      <ImageContainer>
        <BackgroundImage />
        <TextImageContainer>
          <Title className={orbitron.className}>ÁREA DO FUNCIONÁRIO</Title>
          <Image src="/images/login-logo-white.png" width={230} height={120} alt="logo da bikube branca" />
        </TextImageContainer>
      </ImageContainer>
      <div>{children}</div>
    </Container>
  );
};
export default LoginLayout;

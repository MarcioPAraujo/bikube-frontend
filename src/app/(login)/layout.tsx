'use client';

import Image from 'next/image';
import { BackgroundImage, Container, ImageContainer, TextImageContainer, Title } from './layoutStyles';
import { Orbitron } from 'next/font/google';
import { usePathname } from 'next/navigation';

interface IChildren {
  children: React.ReactNode;
}

interface IArea {
  classname: string;
  title: string;
}

// font of the title on image
const orbitron = Orbitron({
  weight: ['900'],
  subsets: ['latin'],
});

// each area settings
const candidate: IArea = {
  classname: 'candidate',
  title: 'ÁREA DO CANDIDATO',
};
const employee: IArea = {
  classname: 'employee',
  title: 'ÁREA DO FUNCIONÁRIO',
};

// array of pathnames to decide which side will eb the image
const right: string[] = [
  // candidate
  '/candidato-login',
  '/candidato-codigo',
  // employee
  '/email',
  '/redefinir-senha',
];
const left: string[] = [
  // candidate
  '/candidato-email',
  '/candidato-redefinir-senha',
  // employee
  '/',
  '/codigo',
];

const LoginLayout: React.FC<IChildren> = ({ children }) => {
  const pathname = usePathname();

  // determine which side the image should be
  const side = right.includes(pathname) ? 'right' : 'left';

  // determin which area is the current based on the path name
  const area = pathname.includes('candidato') ? candidate : employee;

  return (
    <Container className={side}>
      <ImageContainer>
        <BackgroundImage className={area.classname} />
        <TextImageContainer>
          <Title className={orbitron.className}>{area.title}</Title>
          <Image src="/images/login-logo-white.png" width={230} height={120} alt="logo da bikube branca" />
        </TextImageContainer>
      </ImageContainer>
      {children}
    </Container>
  );
};
export default LoginLayout;

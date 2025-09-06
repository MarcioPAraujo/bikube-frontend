'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Button,
  Container,
  ContentWrapper,
  Description,
  LogoWrapper,
  Title,
} from './notFoundStyles';

const NotFoundPage: React.FC = () => {
  const router = useRouter();
  return (
    <Container>
      <ContentWrapper>
        <LogoWrapper>
          <Image
            src="/images/bikube-3d-logo.png"
            fill
            priority
            alt="bikube logo"
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        </LogoWrapper>
        <ContentWrapper>
          <Title>404</Title>
          <Description>A página que procura não exite</Description>
          <Button type="button" onClick={() => router.back()}>
            Voltar a página anterior
          </Button>
        </ContentWrapper>
      </ContentWrapper>
    </Container>
  );
};
export default NotFoundPage;

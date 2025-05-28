import Image from 'next/image';
import { Background, LoadingContainer, LoadingText } from './styles';

const LoadingScreen = () => {
  return (
    <Background>
      <LoadingContainer>
        <Image src="/images/loading.png" alt="Loading" width={80} height={90} priority quality={100} />
        <LoadingText>Carregando...</LoadingText>
      </LoadingContainer>
    </Background>
  );
};
export default LoadingScreen;

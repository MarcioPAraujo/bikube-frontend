import Image from 'next/image';
import { Background, LoadingContainer, LoadingText } from './styles';

interface ILoadingScreenProps {
  message: string;
}
const LoadingScreen: React.FC<ILoadingScreenProps> = ({ message }) => {
  return (
    <Background>
      <LoadingContainer>
        <Image src="/images/loading.png" alt="Loading" width={80} height={90} priority quality={100} />
        <LoadingText>{message}</LoadingText>
      </LoadingContainer>
    </Background>
  );
};
export default LoadingScreen;

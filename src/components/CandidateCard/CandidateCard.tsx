import Image from 'next/image';
import { CardContainer, Content, ImageContainer, Name } from './styles';

interface ICandidateCardProps {
  name: string;
}
const CandidateCard: React.FC<ICandidateCardProps> = ({ name }) => {
  return (
    <CardContainer>
      <ImageContainer>
        <Image
          src="/images/user-profile-placeholder.jpg"
          alt="Foto de perfil do candidato"
          fill
          style={{ objectFit: 'cover' }}
        />
      </ImageContainer>
      <Content>
        <Name>{name}</Name>
      </Content>
    </CardContainer>
  );
};
export default CandidateCard;

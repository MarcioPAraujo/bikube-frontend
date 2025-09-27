import Image from 'next/image';
import {
  Front,
  Content,
  FlipCard,
  FlipCardInner,
  ImageContainer,
  Name,
  Back,
} from './styles';
import CandidateVacancyMatch from '../Charts/CandidateVacancyMatch/CandidateVacacnyMatch';

interface ICandidateCardProps {
  name: string;
  matchPercentage?: number;
}
const CandidateCard: React.FC<ICandidateCardProps> = ({
  name,
  matchPercentage = 50,
}) => {
  return (
    <FlipCard>
      <FlipCardInner>
        <Front>
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
        </Front>
        <Back>
          <CandidateVacancyMatch matchPercentage={matchPercentage} />
        </Back>
      </FlipCardInner>
    </FlipCard>
  );
};
export default CandidateCard;

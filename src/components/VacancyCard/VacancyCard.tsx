import Image from 'next/image';
import {
  CardContainer,
  CardContent,
  Description,
  ImageContainer,
} from './vacancyCardStyles';

interface IVancancyCardProps {
  title: string;
  description: string;
  location: string;
  contractType: string;
}
const VacancyCard: React.FC<IVancancyCardProps> = ({
  title,
  description,
  location,
  contractType,
}) => {
  return (
    <CardContainer>
      <ImageContainer>
        <Image
          src="/images/vacancy.jpg"
          alt="braços de pessoas numa mesa, em uma reunião"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </ImageContainer>
      <CardContent>
        <h3>{title}</h3>
        <p>
          <strong>Local:</strong> {location}
        </p>
        <p>
          <strong>Contrato:</strong> {contractType}
        </p>
        <Description>{description}</Description>
      </CardContent>
    </CardContainer>
  );
};
export default VacancyCard;

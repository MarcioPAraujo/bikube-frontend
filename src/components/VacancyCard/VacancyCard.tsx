import Image from 'next/image';
import { CardContainer, CardContent, Description, ImageContainer } from './vacancyCardStyles';

interface IVancancyCardProps {
  title: string;
  description: string;
  location: string;
  salary: string;
}
const VacancyCard: React.FC<IVancancyCardProps> = ({ title, description, location, salary }) => {
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
          <strong>Salário:</strong> {salary}
        </p>
        <Description>{description}</Description>
      </CardContent>
    </CardContainer>
  );
};
export default VacancyCard;

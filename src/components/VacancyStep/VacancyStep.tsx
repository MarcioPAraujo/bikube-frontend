import Link from 'next/link';
import { Container, Description, Photo, Title } from './styles';

interface IVacancyStep {
  title: string;
  description: string;
  photUrl: string;
  detailsLink: string;
  step: 'triagem' | 'entrevista' | 'oferta';
}

const VacancyStep: React.FC<IVacancyStep> = ({
  title,
  description,
  photUrl,
  detailsLink,
  step,
}) => {
  return (
    <Container className={step}>
      <Title>{title}</Title>
      <Link href={detailsLink}>
        <Photo
          className={step}
          style={{
            backgroundImage: `url(${photUrl})`,
          }}
        >
          <Description>{description}</Description>
        </Photo>
      </Link>
    </Container>
  );
};
export default VacancyStep;

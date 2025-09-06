import {
  ApplyButton,
  Container,
  Details,
  Header,
  StepPhase,
  VancancyName,
} from './vacancyStyles';

interface IVacancyDetailsProps {
  id?: string;
  isApplyed: boolean;
  onApply?: () => void;
  onGiveUp?: () => void;
}

const stepRecord: Record<number, string> = {
  1: 'Análise de currículo',
  2: 'Entrevista com RH',
  3: 'Proposta',
};

const VacancyDetails: React.FC<IVacancyDetailsProps> = ({
  id,
  isApplyed,
  onApply,
  onGiveUp,
}) => {
  console.log(id);
  const handleAction = () => {
    if (isApplyed) {
      onGiveUp?.();
    } else {
      onApply?.();
    }
  };
  return (
    <Container>
      <Header>
        <h2>Detalhes da Vaga</h2>
        {isApplyed && (
          <StepPhase>
            <p>fase: </p>
            <span>{stepRecord['3']}</span>
          </StepPhase>
        )}
      </Header>
      <Details>
        <VancancyName>Nome da vaga</VancancyName>
        <p>publicada em: 01/01/2024</p>
        <strong>O que buscamos:</strong>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquam
          est reiciendis placeat possimus cumque architecto, porro vitae
          corporis sed esse id et quidem quaerat totam ratione pariatur? Quo
          porro perferendis provident, nulla iste maiores sunt excepturi
          voluptas velit officiis veritatis dolorem libero, dolores magnam quasi
          voluptatum minima! Pariatur, rem amet! Suscipit ipsa exercitationem
          incidunt velit autem veniam similique perferendis a quidem iure
          molestias harum esse officiis tempora earum, explicabo quas amet
          repudiandae obcaecati quae itaque! Exercitationem sapiente perferendis
          distinctio expedita qui hic dolorem magni est omnis incidunt
          consequuntur, veritatis rerum asperiores deserunt numquam beatae
          ipsam, in repellendus natus fugit.
        </p>
      </Details>
      <ApplyButton type="button" onClick={handleAction}>
        {isApplyed ? 'Desistir' : 'Candidatar-se'}
      </ApplyButton>
    </Container>
  );
};
export default VacancyDetails;

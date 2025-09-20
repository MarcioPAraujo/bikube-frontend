import { Icon } from '@/components/Icons/Icons';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import { VacancyStage } from '@/utils/vacanciesStages';
import {
  ApplyButton,
  Container,
  Details,
  EmptyStateContainer,
  Header,
  StepPhase,
  VancancyName,
} from './styles';

interface IVacancyDetailsProps {
  id?: string;
  isApplyed: boolean;
  onApply?: () => void;
  onGiveUp?: () => void;
  vacancy: IVacancyListResponse | undefined;
  vacancyStep: string;
}

const VacancyDetails: React.FC<IVacancyDetailsProps> = ({
  id,
  isApplyed,
  onApply,
  onGiveUp,
  vacancy,
  vacancyStep,
}) => {
  const handleAction = () => {
    if (isApplyed) {
      onGiveUp?.();
    } else {
      onApply?.();
    }
  };

  if (!id || !vacancy) {
    return (
      <EmptyStateContainer>
        <div>
          <Icon name="EmptyFile" size={64} color="#ccc" />
          <p>Selecione uma vaga para ver os detalhes</p>
        </div>
      </EmptyStateContainer>
    );
  }

  return (
    <Container>
      <Header>
        <h2>Detalhes da Vaga</h2>
        {isApplyed && (
          <StepPhase>
            <p>fase: </p>
            <span>{vacancyStep}</span>
          </StepPhase>
        )}
      </Header>
      <Details>
        <VancancyName>{vacancy.titulo}</VancancyName>
        <p>
          publicada em: <strong>01/01/2024</strong>
        </p>
        <strong>O que buscamos:</strong>
        <p>{vacancy.descricao}</p>
        <p>
          Local: <strong>{vacancy.localizacao}</strong>
        </p>
        <p>
          Tipo de contrato: <strong>{vacancy.tipoContrato}</strong>
        </p>
        <p>
          Modelo: <strong>{vacancy.modelo}</strong>
        </p>
      </Details>
      {vacancyStep !== VacancyStage.DESISTENCIA && (
        <ApplyButton type="button" onClick={handleAction}>
          {isApplyed ? 'Desistir' : 'Candidatar-se'}
        </ApplyButton>
      )}
    </Container>
  );
};
export default VacancyDetails;

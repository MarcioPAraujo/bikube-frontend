import { Icon } from '@/components/Icons/Icons';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import {
  Description,
  DetailsButton,
  VacancyHeader,
  VacancyItemContainer,
} from './styles';

interface IVacancyItemProps {
  vacancyId: string | undefined;
  selectVacancy: (vacancyId: string) => void;
  vacancy: IVacancyListResponse;
}
const VacancyItem: React.FC<IVacancyItemProps> = ({
  selectVacancy,
  vacancy,
  vacancyId,
}) => {
  return (
    <VacancyItemContainer
      className={vacancyId === vacancy.id.toString() ? 'selected' : ''}
    >
      <VacancyHeader>
        <h3>{vacancy.titulo}</h3>
        <Icon name="Briefcase" size={20} />
      </VacancyHeader>
      <Description>
        Local: <span>{vacancy.localizacao}</span>
      </Description>
      <Description>
        Tipo de contrato: <span>{vacancy.tipoContrato}</span>
      </Description>
      <Description>
        Modelo: <span>{vacancy.modelo}</span>
      </Description>
      <DetailsButton
        type="button"
        onClick={() => selectVacancy(vacancy.id.toString())}
      >
        Detalhes
      </DetailsButton>
    </VacancyItemContainer>
  );
};
export default VacancyItem;

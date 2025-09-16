import { Icon } from '@/components/Icons/Icons';
import { Dispatch, SetStateAction } from 'react';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import {
  Description,
  DetailsButton,
  VacancyHeader,
  VacancyItemContainer,
} from './styles';

interface IVacancyItemProps {
  selectVacancy: Dispatch<SetStateAction<string | undefined>>;
  vacancy: IVacancyListResponse;
}
const VacancyItem: React.FC<IVacancyItemProps> = ({
  selectVacancy,
  vacancy,
}) => {
  return (
    <VacancyItemContainer>
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

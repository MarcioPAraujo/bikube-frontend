import { Icon } from '@/components/Icons/Icons';
import { Dispatch, SetStateAction } from 'react';
import {
  Description,
  DetailsButton,
  VacancyHeader,
  VacancyItemContainer,
} from './styles';

interface IVacancyItemProps {
  selectVacancy: Dispatch<SetStateAction<string | undefined>>;
}
const VacancyItem: React.FC<IVacancyItemProps> = ({ selectVacancy }) => {
  return (
    <VacancyItemContainer>
      <VacancyHeader>
        <h3>Nome da vaga</h3>
        <Icon name="Briefcase" size={20} />
      </VacancyHeader>
      <Description>
        Local: <span>São Paulo, SP</span>
      </Description>
      <Description>
        Tipo de contrato: <span>CLT</span>
      </Description>
      <Description>
        Modelo: <span>Híbrido</span>
      </Description>
      <DetailsButton type="button" onClick={() => selectVacancy('1')}>
        Detalhes
      </DetailsButton>
    </VacancyItemContainer>
  );
};
export default VacancyItem;

import { Icon } from '@/components/Icons/Icons';
import { useRouter } from 'next/navigation';
import RenderIf from '@/components/RenderIf/RenderIf';
import { Dispatch, SetStateAction } from 'react';
import {
  HistoryButton,
  TitleContainer,
  VacancyListContainer,
} from './vacancyListStyles';
import VacancyItem from '../VacancyItem/VacancyItem';

interface IVacancyListProps {
  type: 'aplicadas' | 'abertas';
  setSelectedVacancyId: Dispatch<SetStateAction<string | undefined>>;
}

enum Routes {
  APPLICATION_HISTORY = '/area-do-candidato/historico',
}

const mockVacancies = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Vaga ${i + 1}`,
  location: 'São Paulo, SP',
  contractType: 'CLT',
  workModel: 'Híbrido',
}));

const VacancyList: React.FC<IVacancyListProps> = ({
  type,
  setSelectedVacancyId,
}) => {
  const router = useRouter();
  return (
    <div>
      <TitleContainer>
        <h2>Vagas</h2>
        <RenderIf isTrue={type === 'aplicadas'}>
          <HistoryButton
            type="button"
            onClick={() => router.push(Routes.APPLICATION_HISTORY)}
          >
            <Icon name="History" size={20} /> Histórico de candidaturas
          </HistoryButton>
        </RenderIf>
      </TitleContainer>
      <VacancyListContainer>
        {mockVacancies.map(item => (
          <VacancyItem key={item.id} selectVacancy={setSelectedVacancyId} />
        ))}
      </VacancyListContainer>
    </div>
  );
};
export default VacancyList;

import { Icon } from '@/components/Icons/Icons';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import {
  getAllVacancies,
  getAppliedVacancies,
} from '@/services/vacancy/vacancyService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { IAppliedVacanciesListResponse } from '@/interfaces/vacancy/appliedVacanciesListResponse';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import VacancyItem from '../VacancyItem/VacancyItem';
import { HistoryButton, TitleContainer, VacancyListContainer } from './styles';

interface IVacancyListProps {
  type: 'aplicadas' | 'abertas';
  setSelectedVacancyId: Dispatch<SetStateAction<string | undefined>>;
  setVacancy: Dispatch<SetStateAction<IVacancyListResponse | undefined>>;
  setVacancyStep?: Dispatch<SetStateAction<string>>;
}

enum Routes {
  APPLICATION_HISTORY = '/area-do-candidato/historico',
}

const VacancyList: React.FC<IVacancyListProps> = ({
  type,
  setSelectedVacancyId,
  setVacancy,
  setVacancyStep,
}) => {
  const { candidate } = useCandidateAuth();
  const router = useRouter();

  const candidateId = candidate?.id ? Number(candidate.id) : 0;

  const { data, isError, isPending } = useQuery({
    queryKey: ['vacancies', type],
    queryFn: async () => {
      if (type === 'aplicadas') {
        const result = await getAppliedVacancies(candidateId);
        return result.data || [];
      }
      if (type === 'abertas') {
        const result = await getAllVacancies();
        return result.data || [];
      }
      return [];
    },
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar vagas. Tente novamente mais tarde.</div>;
  }

  if (!data || data.length === 0) {
    return <div>Nenhuma vaga encontrada.</div>;
  }

  const handleSelectVacancy = async (vacancyId: string) => {
    const result = await getAllVacancies();
    if (result.error) {
      return;
    }
    const vacancy = result.data?.find(v => v.id.toString() === vacancyId);
    if (!vacancy) return;
    setSelectedVacancyId(vacancyId);
    setVacancy(vacancy);
  };

  if ('candidato' in data[0]) {
    const appliedVacancies = data as IAppliedVacanciesListResponse[];

    return (
      <div>
        <TitleContainer>
          <h2>Vagas</h2>
          <HistoryButton
            type="button"
            onClick={() => router.push(Routes.APPLICATION_HISTORY)}
          >
            <Icon name="History" size={20} /> Histórico de candidaturas
          </HistoryButton>
        </TitleContainer>
        <VacancyListContainer>
          {appliedVacancies.map((item, idx) => (
            <VacancyItem
              key={item.id}
              selectVacancy={id => {
                handleSelectVacancy(id);
                if (setVacancyStep) {
                  setVacancyStep(appliedVacancies[idx].etapa);
                }
              }}
              vacancy={item.vaga}
            />
          ))}
        </VacancyListContainer>
      </div>
    );
  }

  const vacancies = data as IVacancyListResponse[];

  return (
    <div>
      <TitleContainer>
        <h2>Vagas</h2>
      </TitleContainer>
      <VacancyListContainer>
        {vacancies.map(item => (
          <VacancyItem
            key={item.id}
            selectVacancy={handleSelectVacancy}
            vacancy={item}
          />
        ))}
      </VacancyListContainer>
    </div>
  );
};
export default VacancyList;

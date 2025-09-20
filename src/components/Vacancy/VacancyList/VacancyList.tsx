import { Icon } from '@/components/Icons/Icons';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import {
  getAllVacancies,
  getAppliedVacancies,
} from '@/services/vacancy/vacancyService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import { VacancyStage } from '@/utils/vacanciesStages';
import VacancyItem from '../VacancyItem/VacancyItem';
import { HistoryButton, TitleContainer, VacancyListContainer } from './styles';

interface IVacancyListProps {
  type: 'aplicadas' | 'abertas';
  vacancyId: string | undefined;
  setSelectedVacancyId: Dispatch<SetStateAction<string | undefined>>;
  setVacancy: Dispatch<SetStateAction<IVacancyListResponse | undefined>>;
  setVacancyStep?: Dispatch<SetStateAction<string>>;
}

enum Routes {
  APPLICATION_HISTORY = '/area-do-candidato/historico',
}

const VacancyList: React.FC<IVacancyListProps> = ({
  type,
  vacancyId,
  setSelectedVacancyId,
  setVacancy,
  setVacancyStep,
}) => {
  const { candidate } = useCandidateAuth();
  const router = useRouter();

  const candidateId = candidate?.id ? Number(candidate.id) : 0;

  const {
    data: allVacancies,
    isError: allVacanciesError,
    isPending: allVacanciesPending,
  } = useQuery({
    queryKey: ['vacancies'],
    queryFn: async () => {
      const result = await getAllVacancies();
      return result.data || [];
    },
    placeholderData: keepPreviousData,
  });
  const {
    data: applied,
    isError: appliedError,
    isPending: appliedPending,
  } = useQuery({
    queryKey: ['appliedVacancies', candidateId],
    queryFn: async () => {
      const result = await getAppliedVacancies(candidateId);
      return result.data || [];
    },
    placeholderData: keepPreviousData,
  });

  const handleSelectVacancy = (vacancyId: string) => {
    if (!vacancyId) return;
    if (!allVacancies || allVacancies.length === 0) return;
    const vacancy = allVacancies.find(v => v.id.toString() === vacancyId);
    if (!vacancy) return;
    setSelectedVacancyId(vacancyId);
    setVacancy(vacancy);
  };

  if (type === 'aplicadas') {
    if (appliedPending) {
      return <div>Carregando...</div>;
    }

    if (appliedError) {
      return <div>Erro ao carregar vagas. Tente novamente mais tarde.</div>;
    }

    if (!applied || applied.length === 0) {
      return <div>Nenhuma vaga encontrada.</div>;
    }

    const filteredVacancies = Array.isArray(applied)
      ? applied.filter(item => item.etapa !== VacancyStage.DESISTENCIA)
      : [];

    if (filteredVacancies.length === 0) {
      return <div>Nenhuma vaga encontrada.</div>;
    }

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
          {filteredVacancies.map((item, idx) => (
            <VacancyItem
              key={item.id}
              vacancyId={vacancyId}
              selectVacancy={id => {
                handleSelectVacancy(id);
                if (setVacancyStep) {
                  setVacancyStep(filteredVacancies[idx].etapa);
                }
              }}
              vacancy={item.vaga}
            />
          ))}
        </VacancyListContainer>
      </div>
    );
  }

  if (allVacanciesPending) {
    return <div>Carregando...</div>;
  }

  if (allVacanciesError) {
    return <div>Erro ao carregar vagas. Tente novamente mais tarde.</div>;
  }

  if (!allVacancies || allVacancies.length === 0) {
    return <div>Nenhuma vaga encontrada.</div>;
  }

  return (
    <div>
      <TitleContainer>
        <h2>Vagas</h2>
      </TitleContainer>
      <VacancyListContainer>
        {allVacancies.map(item => (
          <VacancyItem
            key={item.id}
            vacancyId={vacancyId}
            selectVacancy={handleSelectVacancy}
            vacancy={item}
          />
        ))}
      </VacancyListContainer>
    </div>
  );
};
export default VacancyList;

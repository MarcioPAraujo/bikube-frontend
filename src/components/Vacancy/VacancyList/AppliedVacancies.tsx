import { IAppliedVacanciesListResponse } from '@/interfaces/vacancy/appliedVacanciesListResponse';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import { Dispatch, SetStateAction } from 'react';
import { Icon } from '@/components/Icons/Icons';
import { VacancyStage } from '@/utils/vacanciesStages';
import { useRouter } from 'next/navigation';
import VacancyItem from '../VacancyItem/VacancyItem';
import { HistoryButton, TitleContainer, VacancyListContainer } from './styles';

interface IAppliedVacancyListProps {
  applied: IAppliedVacanciesListResponse[] | undefined;
  isError: boolean;
  isPending: boolean;
  vacancyId: string | undefined;
  setSelectedVacancyId: Dispatch<SetStateAction<string | undefined>>;
  setVacancy: Dispatch<SetStateAction<IVacancyListResponse | undefined>>;
  setVacancyStep: Dispatch<SetStateAction<string>>;
}

enum Routes {
  APPLICATION_HISTORY = '/area-do-candidato/historico',
}

const AppliedVacancies: React.FC<IAppliedVacancyListProps> = ({
  applied,
  isError,
  isPending,
  vacancyId,
  setSelectedVacancyId,
  setVacancy,
  setVacancyStep,
}) => {
  const router = useRouter();

  if (isPending) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar vagas. Tente novamente mais tarde.</div>;
  }

  if (!applied || applied.length === 0) {
    return <div>Nenhuma vaga encontrada.</div>;
  }

  const filteredVacancies = Array.isArray(applied)
    ? applied.filter(item => item.etapa !== VacancyStage.DESISTENCIA)
    : [];

  if (filteredVacancies.length === 0) {
    return (
      <div>
        <TitleContainer>
          <h2>Vagas</h2>
          <abbr title="Histórico de candidaturas">
            <HistoryButton
              type="button"
              onClick={() => router.push(Routes.APPLICATION_HISTORY)}
            >
              <Icon name="History" size={20} />
            </HistoryButton>
          </abbr>
        </TitleContainer>
        Nenhuma vaga encontrada.
      </div>
    );
  }

  return (
    <div>
      <TitleContainer>
        <h2>Vagas</h2>
        <abbr title="Histórico de candidaturas">
          <HistoryButton
            type="button"
            onClick={() => router.push(Routes.APPLICATION_HISTORY)}
          >
            <Icon name="History" size={20} />
          </HistoryButton>
        </abbr>
      </TitleContainer>
      <VacancyListContainer>
        {filteredVacancies.map((item, idx) => (
          <VacancyItem
            key={item.id}
            vacancyId={vacancyId}
            selectVacancy={() => {
              setSelectedVacancyId(item.vaga.id.toString());
              setVacancy(item.vaga);
              setVacancyStep(filteredVacancies[idx].etapa);
            }}
            vacancy={item.vaga}
          />
        ))}
      </VacancyListContainer>
    </div>
  );
};
export default AppliedVacancies;

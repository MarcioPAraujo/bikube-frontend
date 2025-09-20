import { IAppliedVacanciesListResponse } from '@/interfaces/vacancy/appliedVacanciesListResponse';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import { Dispatch, SetStateAction, useState } from 'react';
import { Icon } from '@/components/Icons/Icons';
import { VacancyStage } from '@/utils/vacanciesStages';
import { useRouter } from 'next/navigation';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { normalizeString } from '@/utils/normalizeString';
import RenderIf from '@/components/RenderIf/RenderIf';
import VacancyItem from '../VacancyItem/VacancyItem';
import {
  EmptyState,
  HistoryButton,
  TitleContainer,
  VacancyListContainer,
} from './styles';

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
  const [search, setSearch] = useState<string>('');

  if (isPending) {
    return <EmptyState>Carregando...</EmptyState>;
  }

  if (isError) {
    return (
      <EmptyState>
        Erro ao carregar vagas. Tente novamente mais tarde.
      </EmptyState>
    );
  }

  if (!applied || applied.length === 0) {
    return <EmptyState>Nenhuma vaga encontrada.</EmptyState>;
  }

  const filteredVacancies = Array.isArray(applied)
    ? applied.filter(item => item.etapa !== VacancyStage.DESISTENCIA)
    : [];

  const normalizedSearch = normalizeString(search);
  const searchedVacancies = !normalizedSearch
    ? filteredVacancies
    : filteredVacancies
        .filter(vacancy =>
          normalizeString(vacancy.vaga.titulo).includes(normalizedSearch),
        )
        .sort((a, b) => {
          const normalizedA = normalizeString(a.vaga.titulo);
          const normalizedB = normalizeString(b.vaga.titulo);
          if (normalizedA < normalizedB) return -1;
          if (normalizedA > normalizedB) return 1;
          return normalizedA.localeCompare(normalizedB);
        });

  return (
    <div>
      <TitleContainer>
        <h2>Vagas</h2>
        <SearchBarComponent
          placeholder="Buscar vaga"
          value={search}
          onSearch={e => setSearch(e.target.value)}
        />
        <abbr title="Histórico de candidaturas">
          <HistoryButton
            type="button"
            onClick={() => router.push(Routes.APPLICATION_HISTORY)}
          >
            <Icon name="History" size={20} />
          </HistoryButton>
        </abbr>
      </TitleContainer>
      <RenderIf isTrue={searchedVacancies.length > 0}>
        <VacancyListContainer>
          {searchedVacancies.map((item, idx) => (
            <VacancyItem
              key={item.id}
              vacancyId={vacancyId}
              selectVacancy={() => {
                setSelectedVacancyId(item.vaga.id.toString());
                setVacancy(item.vaga);
                setVacancyStep(searchedVacancies[idx].etapa);
              }}
              vacancy={item.vaga}
            />
          ))}
        </VacancyListContainer>
      </RenderIf>
      <RenderIf isTrue={searchedVacancies.length === 0}>
        <EmptyState>Nenhuma vaga encontrada.</EmptyState>
      </RenderIf>
    </div>
  );
};
export default AppliedVacancies;

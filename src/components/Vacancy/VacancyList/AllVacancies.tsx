import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import { Dispatch, SetStateAction, useState } from 'react';
import { IAppliedVacanciesListResponse } from '@/interfaces/vacancy/appliedVacanciesListResponse';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { normalizeString } from '@/utils/normalizeString';
import RenderIf from '@/components/RenderIf/RenderIf';
import VacancyItem from '../VacancyItem/VacancyItem';
import { EmptyState, TitleContainer, VacancyListContainer } from './styles';

interface IAllVacancyListProps {
  allVacancies: IVacancyListResponse[] | undefined;
  applied: IAppliedVacanciesListResponse[] | undefined;
  isError: boolean;
  isPending: boolean;
  vacancyId: string | undefined;
  setSelectedVacancyId: Dispatch<SetStateAction<string | undefined>>;
  setVacancy: Dispatch<SetStateAction<IVacancyListResponse | undefined>>;
}

const AllVacancies: React.FC<IAllVacancyListProps> = ({
  allVacancies,
  applied,
  isError,
  isPending,
  vacancyId,
  setSelectedVacancyId,
  setVacancy,
}) => {
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

  if (!allVacancies || allVacancies.length === 0) {
    return <EmptyState>Nenhuma vaga encontrada.</EmptyState>;
  }

  // Filter out vacancies that the candidate has already applied to
  const appliedVacanciesIds = Array.isArray(applied)
    ? new Set(applied.map(item => item.vaga.id))
    : new Set<number>();
  const filteredVacancies = Array.isArray(allVacancies)
    ? allVacancies.filter(
        vacancy =>
          !appliedVacanciesIds.has(vacancy.id) && vacancy.status === 'ativo',
      )
    : [];

  const normalizedSearch = normalizeString(search);
  const searchedVacancies = !normalizedSearch
    ? filteredVacancies
    : filteredVacancies
        .filter(vacancy =>
          normalizeString(vacancy.titulo).includes(normalizedSearch),
        )
        .sort((a, b) => {
          const normalizedA = normalizeString(a.titulo);
          const normalizedB = normalizeString(b.titulo);

          const aStartsWith = normalizedA.startsWith(normalizedSearch);
          const bStartsWith = normalizedB.startsWith(normalizedSearch);

          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;

          return normalizedA.localeCompare(normalizedB);
        });

  return (
    <div>
      <TitleContainer>
        <h2>Vagas</h2>
        <SearchBarComponent
          placeholder="Buscar vaga..."
          value={search}
          onSearch={e => setSearch(e.target.value)}
        />
      </TitleContainer>
      <RenderIf isTrue={searchedVacancies.length > 0}>
        <VacancyListContainer>
          {searchedVacancies.map(item => (
            <VacancyItem
              key={item.id}
              vacancyId={vacancyId}
              selectVacancy={() => {
                setSelectedVacancyId(item.id.toString());
                setVacancy(item);
              }}
              vacancy={item}
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
export default AllVacancies;

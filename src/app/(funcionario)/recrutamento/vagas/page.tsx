'use client';

import SecondaryButton from '@/components/Buttons/SecondaryButton/SecondaryButton';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VacancyCard from '@/components/VacancyCard/VacancyCard';
import { normalizeString } from '@/utils/normalizeString';
import usePaginationRange from '@/hooks/usePaginationRange';
import Pagination from '@/components/Pagination/Pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAllVacancies } from '@/services/vacancy/vacancyService';
import { ActionsContainer, CardsContainer, CustomLink } from './styles';

enum Routes {
  NEW_VACANCY = '/recrutamento/nova-vaga',
  VACANCY = '/recrutamento',
}

const PAGE_SIZE = 9;
const RecutamentoPage: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  /**
   * Fetches the list of vacancies using React Query
   * @returns The vacancies data along with fetching status
   */
  const { data, isPlaceholderData } = useQuery({
    queryKey: ['vacancies'],
    queryFn: async () => {
      const result = await getAllVacancies();
      if (!result.data) return [];
      return result.data;
    },
    placeholderData: keepPreviousData,
  });

  /**
   * Stores the list of vacancies or an empty array if no data is available
   * @returns array of vacancies
   */
  const listOfVacancies = data || [];

  /**
   * Filters and sorts the vacancies based on the search input
   * @returns Filtered and sorted vacancies array
   */
  const normalizedSearch = normalizeString(search);
  const filteredVacancies = listOfVacancies
    /**
     * Filters the vacancies whose titles include the normalized search string
     * it ignores accents and is case-insensitive
     * and sorts them to prioritize those starting with the search string
     */
    .filter(vacancy =>
      normalizeString(vacancy.titulo).includes(normalizedSearch),
    )
    .sort((a, b) => {
      /**
       * Normalizes the titles of the vacancies for comparison
       */
      const normalizedA = normalizeString(a.titulo);
      const normalizedB = normalizeString(b.titulo);

      /**
       * Determines if each title starts with the normalized search string
       */
      const aStartsWithSearch = normalizedA.startsWith(normalizedSearch);
      const bStartsWithSearch = normalizedB.startsWith(normalizedSearch);

      // Prioritizes vacancies whose titles start with the search string
      if (aStartsWithSearch && !bStartsWithSearch) return -1;

      // If only b starts with the search string, it comes first
      if (!aStartsWithSearch && bStartsWithSearch) return 1;

      // If both or neither start with the search string, sort alphabetically
      return normalizedA.localeCompare(normalizedB);
    });

  /**
   * Sets up pagination for the filtered vacancies
   * @returns Pagination object
   */
  const pagination = usePaginationRange(filteredVacancies, PAGE_SIZE);

  /**
   * First render check: if there's no data and it's not placeholder data,
   * it means it's the first render and the data is still being fetched
   */
  if (!data && !isPlaceholderData) {
    return (
      <div>
        <ActionsContainer>
          <SearchBarComponent
            placeholder="Buscar vaga"
            value={search}
            onSearch={e => setSearch(e.target.value)}
          />
          <SecondaryButton
            text="Criar nova vaga"
            onClick={() => {
              router.push(Routes.NEW_VACANCY);
            }}
          />
        </ActionsContainer>
      </div>
    );
  }

  /**
   * Displays a message if no vacancies are found
   * It occurs when the data is fetched but the list is empty
   * when the search yields no results and some error during data fetching
   */
  if (!data || data.length === 0) {
    return (
      <div>
        <ActionsContainer>
          <SearchBarComponent
            placeholder="Buscar vaga"
            value={search}
            onSearch={e => setSearch(e.target.value)}
          />
          <SecondaryButton
            text="Criar nova vaga"
            onClick={() => {
              router.push(Routes.NEW_VACANCY);
            }}
          />
        </ActionsContainer>
        <h2>Nenhuma vaga encontrada</h2>
      </div>
    );
  }

  return (
    <div>
      <ActionsContainer>
        <SearchBarComponent
          placeholder="Buscar vaga"
          value={search}
          onSearch={e => setSearch(e.target.value)}
        />
        <SecondaryButton
          text="Criar nova vaga"
          onClick={() => {
            router.push(Routes.NEW_VACANCY);
          }}
        />
      </ActionsContainer>
      <CardsContainer>
        {pagination.currentRows.map(vacancy => (
          <CustomLink
            key={vacancy.id}
            href={`${Routes.VACANCY}/${vacancy.id}/detalhes?nome=${vacancy.titulo}`}
          >
            <VacancyCard
              key={vacancy.id}
              title={vacancy.titulo}
              description={vacancy.descricao}
              location={vacancy.localizacao}
              contractType={vacancy.tipoContrato}
            />
          </CustomLink>
        ))}
      </CardsContainer>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={listOfVacancies.length}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};
export default RecutamentoPage;

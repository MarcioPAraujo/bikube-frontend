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

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['vacancies'],
    queryFn: async () => {
      const result = await getAllVacancies();
      if (!result.data) return [];
      return result.data;
    },
    placeholderData: keepPreviousData,
  });

  const listOfVacancies = data || [];

  const normalizedSearch = normalizeString(search);
  const filteredVacancies = listOfVacancies
    .filter(vacancy =>
      normalizeString(vacancy.titulo).includes(normalizedSearch),
    )
    .sort((a, b) => {
      const normalizedA = normalizeString(a.titulo);
      const normalizedB = normalizeString(b.titulo);

      const aStartsWithSearch = normalizedA.startsWith(normalizedSearch);
      const bStartsWithSearch = normalizedB.startsWith(normalizedSearch);

      if (aStartsWithSearch && !bStartsWithSearch) return -1;
      if (!aStartsWithSearch && bStartsWithSearch) return 1;

      return normalizedA.localeCompare(normalizedB);
    });

  const pagination = usePaginationRange(filteredVacancies, PAGE_SIZE);

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

'use client';

import SecondaryButton from '@/components/Buttons/SecondaryButton/SecondaryButton';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import Tabs, { ITab } from '@/components/Tabs/Tabs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VacancyCard, {
  IVancancyCardProps,
} from '@/components/VacancyCard/VacancyCard';
import { normalizeString } from '@/utils/normalizeString';
import usePaginationRange from '@/hooks/usePaginationRange';
import Pagination from '@/components/Pagination/Pagination';
import { ActionsContainer, CardsContainer } from './styles';

const tabs: ITab[] = [
  {
    label: 'Vagas',
    url: '/recrutamento',
    baseUrl: '/recrutamento',
    description: 'Aqui se encontra todas as vagas abertas atualmente',
  },
];

const vacanciesMock: IVancancyCardProps[] = Array.from(
  { length: 20 },
  (_, i) => ({
    title: `Vaga ${i + 1}`,
    description: 'Descrição da vaga',
    location: 'Localização da vaga',
    contractType: 'Tipo de contrato',
  }),
);

const PAGE_SIZE = 9;
const RecutamentoPage: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const normalizedSearch = normalizeString(search);
  const filteredVacancies = vacanciesMock
    .filter(vacancy =>
      normalizeString(vacancy.title).includes(normalizedSearch),
    )
    .sort((a, b) => {
      const normalizedA = normalizeString(a.title);
      const normalizedB = normalizeString(b.title);

      const aStartsWithSearch = normalizedA.startsWith(normalizedSearch);
      const bStartsWithSearch = normalizedB.startsWith(normalizedSearch);

      if (aStartsWithSearch && !bStartsWithSearch) return -1;
      if (!aStartsWithSearch && bStartsWithSearch) return 1;

      return normalizedA.localeCompare(normalizedB);
    });

  const pagination = usePaginationRange(filteredVacancies, PAGE_SIZE);
  return (
    <div>
      <Tabs tabs={tabs} />
      <ActionsContainer>
        <SearchBarComponent
          placeholder="Buscar vaga"
          value={search}
          onSearch={e => setSearch(e.target.value)}
        />
        <SecondaryButton
          text="Criar nova vaga"
          onClick={() => {
            router.push('/recrutamento/criar-vaga');
          }}
        />
      </ActionsContainer>
      <CardsContainer>
        {pagination.currentRows.map((vacancy, index) => (
          <VacancyCard
            key={index}
            title={vacancy.title}
            description={vacancy.description}
            location={vacancy.location}
            contractType={vacancy.contractType}
          />
        ))}
      </CardsContainer>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={vacanciesMock.length}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};
export default RecutamentoPage;

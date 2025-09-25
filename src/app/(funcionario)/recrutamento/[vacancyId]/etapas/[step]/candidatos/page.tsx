'use client';

import CandidateCard from '@/components/CandidateCard/CandidateCard';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import Pagination from '@/components/Pagination/Pagination';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import { normalizeString } from '@/utils/normalizeString';
import { useEffect, useMemo, useState } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { CardsContainer, CustomLink, Subtitle } from './styles';

interface ICadidate {
  id: string;
  name: string;
}

const candidates: ICadidate[] = Array.from({ length: 100 }, (_, index) => ({
  id: `candidate-${index + 1}`,
  name: `Candidato ${index + 1}`,
}));

const VacancyCandidatesPage: React.FC = () => {
  const pathname = usePathname();
  const [search, setSearch] = useState<string>('');
  const { step } = useParams<{ step: string }>();

  const searchParams = useSearchParams();
  const [vacancyName, setVacancyName] = useState<string>('');

  useEffect(() => {
    const name = searchParams.get('nome');
    if (name) {
      setVacancyName(name);
    }
  }, [searchParams]);

  const normalizedSearch = normalizeString(search);
  const filteredCandidates = useMemo(() => {
    if (!search) return candidates;
    return candidates
      .filter(candidate =>
        normalizeString(candidate.name).includes(normalizedSearch),
      )
      .sort((a, b) => {
        const nameA = normalizeString(a.name);
        const nameB = normalizeString(b.name);
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return nameA.localeCompare(nameB);
      });
  }, [search, candidates]);

  const pagination = usePaginationRange(filteredCandidates, DEFAULT_PAGE_SIZE);

  return (
    <div>
      <Subtitle>Veja todos os candidatos na etapa de {step}</Subtitle>
      <SearchBarComponent
        placeholder="Buscar candidato"
        value={search}
        onSearch={e => {
          pagination.setCurrentPage(1);
          setSearch(e.target.value);
        }}
      />
      <CardsContainer>
        {pagination.currentRows.map(candidate => (
          <CustomLink
            key={candidate.id}
            href={`${pathname}/${candidate.id}?nome=${vacancyName}`}
          >
            <CandidateCard key={candidate.id} name={candidate.name} />
          </CustomLink>
        ))}
      </CardsContainer>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={candidates.length}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};
export default VacancyCandidatesPage;

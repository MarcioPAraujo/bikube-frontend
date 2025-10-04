'use client';

import CandidateCard from '@/components/CandidateCard/CandidateCard';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import Pagination from '@/components/Pagination/Pagination';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import { normalizeString } from '@/utils/normalizeString';
import { useEffect, useMemo, useState } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getVacancyApplicants } from '@/services/vacancy/vacancyService';
import { CardsContainer, CustomLink, Subtitle } from './styles';

const VacancyCandidatesPage: React.FC = () => {
  const pathname = usePathname();
  const [search, setSearch] = useState<string>('');
  const { step, vacancyId } = useParams<{ step: string; vacancyId: string }>();

  const searchParams = useSearchParams();
  const [vacancyName, setVacancyName] = useState<string>('');

  const { data: candidates } = useQuery({
    queryKey: ['vacancyApplicants', step, vacancyId],
    queryFn: () =>
      getVacancyApplicants({
        idvaga: Number(vacancyId),
        etapa: step.toUpperCase(),
      }),
    enabled: !!vacancyId && !!step,
    placeholderData: keepPreviousData,
  });

  const applicants = candidates?.data || [];

  useEffect(() => {
    const name = searchParams.get('nome');
    if (name) {
      setVacancyName(name);
    }
  }, [searchParams]);

  const normalizedSearch = normalizeString(search);
  const filteredCandidates = useMemo(() => {
    if (!search) return applicants;
    return applicants
      .filter(candidate =>
        normalizeString(candidate.candidato.nome).includes(normalizedSearch),
      )
      .sort((a, b) => {
        const nameA = normalizeString(a.candidato.nome);
        const nameB = normalizeString(b.candidato.nome);
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
            key={candidate.candidato.id}
            href={`${pathname}/${candidate.candidato.id}?nome=${vacancyName}`}
          >
            <CandidateCard
              key={candidate.candidato.id}
              name={candidate.candidato.nome}
              matchPercentage={candidate.compatibilidadeEmPorcentagem}
            />
          </CustomLink>
        ))}
      </CardsContainer>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={candidates?.data?.length || 0}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};
export default VacancyCandidatesPage;

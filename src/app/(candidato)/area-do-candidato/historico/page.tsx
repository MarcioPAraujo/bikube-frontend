'use client';

import VacancyCard from '@/components/VacancyCard/VacancyCard';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { useState } from 'react';
import IconButton from '@/components/Buttons/IconButton';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/Icons/Icons';
import { normalizeString } from '@/utils/normalizeString';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { getAppliedVacancies } from '@/services/vacancy/vacancyService';
import { VacancyStage } from '@/utils/vacanciesStages';
import RenderIf from '@/components/RenderIf/RenderIf';
import {
  ButtonsContainer,
  CardsContainer,
  EmptyState,
  Page,
  TitleSection,
} from './styles';

enum Routes {
  HOME = '/area-do-candidato/inicio',
}

const HistoryPage: React.FC = () => {
  const { candidate } = useCandidateAuth();
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const candidateId = candidate ? Number(candidate.id) : 0;

  const {
    data: vacancies,
    isError,
    isPending,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['vacancies'],
    queryFn: async () => {
      const result = await getAppliedVacancies(candidateId);
      if (!result.data) return [];
      return result.data.filter(
        v =>
          v.etapa === VacancyStage.DESISTENCIA ||
          v.etapa === VacancyStage.FINALIZADO,
      );
    },
    placeholderData: keepPreviousData,
  });

  if (!vacancies && !isPlaceholderData) return null;
  if (isPending) return null;
  if (isError) return null;

  const normalizedSearch = normalizeString(search);
  const filteredVacancies = !normalizedSearch
    ? vacancies
    : vacancies
        .filter(vacancy =>
          normalizeString(vacancy.vaga.titulo).includes(normalizedSearch),
        )
        .sort((a, b) => {
          const normalizedA = normalizeString(a.vaga.titulo);
          const normalizedB = normalizeString(b.vaga.titulo);

          const aStartsWith = normalizedA.startsWith(normalizedSearch);
          const bStartsWith = normalizedB.startsWith(normalizedSearch);

          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;

          return normalizedA.localeCompare(normalizedB);
        });

  return (
    <Page>
      <TitleSection>
        <ButtonsContainer>
          <IconButton
            onClick={() => router.push(Routes.HOME)}
            iconNode={<Icon name="Home" />}
          />
          <div>
            <h1>Histórico</h1>
            <p>Veja as vagas que você se candidatou</p>
          </div>
        </ButtonsContainer>
        <SearchBarComponent
          value={search}
          placeholder="Pesquisar vaga"
          onSearch={e => setSearch(e.target.value)}
        />
      </TitleSection>
      <RenderIf isTrue={filteredVacancies.length > 0}>
        <CardsContainer>
          {filteredVacancies &&
            filteredVacancies.map((vacancy, index) => (
              <VacancyCard
                key={index}
                title={vacancy?.vaga?.titulo}
                description={vacancy?.vaga?.descricao}
                location={vacancy?.vaga?.localizacao}
                contractType={vacancy?.vaga?.tipoContrato}
              />
            ))}
        </CardsContainer>
      </RenderIf>
      <RenderIf isTrue={filteredVacancies.length === 0}>
        <EmptyState>Nenhuma vaga encontrada.</EmptyState>
      </RenderIf>
    </Page>
  );
};
export default HistoryPage;

'use client';

import CandidateCard from '@/components/CandidateCard/CandidateCard';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GivingUpChart from '@/components/Charts/GivingUpChart/GivingUpChart';
import VacancyMatchesChart from '@/components/Charts/VacancyMatchesChart/VacancyMatchesChart';
import ApplicantByStep from '@/components/Charts/ApplicantByStep/ApplicantByStep';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTopApplicantsForVacancy } from '@/services/vacancy/vacancyService';
import {
  CardsContainer,
  CustomLink,
  DoughnutContainer,
  PageWrapper,
  Subtitle,
  Title,
} from './styles';

const VacancyDashboardPage: React.FC = () => {
  const pathanme = usePathname();
  const searchParams = useSearchParams();
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const [vacancyName, setVacancyName] = useState<string>('');

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['top-applicants', vacancyId],
    queryFn: () => getTopApplicantsForVacancy(Number(vacancyId)),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const name = searchParams.get('nome');
    if (name) {
      setVacancyName(name);
    }
  }, []);

  const pathArray = pathanme.split('/');
  pathArray.pop();
  // the step path must be provided by the backend, otherwise
  // click on the card will not direct the user to the candidate profile
  // because the candidate profile is under the step route
  // e.g. /funcionario/recrutamento/123/etapas/triagem/456
  const basePath = [...pathArray, 'etapas', 'triagem', 'candidatos'].join('/');

  if (!data && !isPlaceholderData) {
    return (
      <PageWrapper>
        <Title>Relatórios</Title>
      </PageWrapper>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <PageWrapper>
        <Title>Relatórios</Title>
        <Subtitle>Nenhum candidato encontrado</Subtitle>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Title>Relatórios</Title>
      <div>
        <Subtitle>Top 10 candidatos</Subtitle>
        <CardsContainer>
          {data.data.map(candidate => (
            <CustomLink
              href={`${basePath}/${candidate.candidato.id}?nome=${vacancyName}`}
              key={candidate.candidato.id}
            >
              <CandidateCard
                key={candidate.candidato.id}
                name={candidate.candidato.nome}
              />
            </CustomLink>
          ))}
        </CardsContainer>
      </div>
      <DoughnutContainer>
        <GivingUpChart />
        <VacancyMatchesChart vacancyId={Number(vacancyId)} />
      </DoughnutContainer>
      <ApplicantByStep />
    </PageWrapper>
  );
};
export default VacancyDashboardPage;

'use client';

import CandidateCard from '@/components/CandidateCard/CandidateCard';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GivingUpChart from '@/components/Charts/GivingUpChart/GivingUpChart';
import VacancyMatchesChart from '@/components/Charts/VacancyMatchesChart/VacancyMatchesChart';
import ApplicantByStep from '@/components/Charts/ApplicantByStep/ApplicantByStep';
import {
  CardsContainer,
  CustomLink,
  DoughnutContainer,
  PageWrapper,
  Subtitle,
  Title,
} from './styles';

const TopApplicants: string[] = Array.from(
  { length: 10 },
  (_, i) => `Candidato ${i + 1}`,
);

const VacancyDashboardPage: React.FC = () => {
  const pathanme = usePathname();
  const searchParams = useSearchParams();
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const [vacancyName, setVacancyName] = useState<string>('');

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

  return (
    <PageWrapper>
      <Title>Relatórios</Title>
      <div>
        <Subtitle>Top 10 candidatos</Subtitle>
        <CardsContainer>
          {TopApplicants.map((candidate, index) => (
            <CustomLink
              href={`${basePath}/${index}?nome=${vacancyName}`}
              key={index}
            >
              <CandidateCard key={index} name={candidate} />
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

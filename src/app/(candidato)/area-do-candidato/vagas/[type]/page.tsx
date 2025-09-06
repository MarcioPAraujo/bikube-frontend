'use client';

import VacancyDetails from '@/components/Vacancy/VacancyDetails/VacancyDetails';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Icon } from '@/components/Icons/Icons';
import VacancyList from '@/components/Vacancy/VacancyList/VacancyList';
import {
  BackButton,
  LeftContainer,
  PageContainer,
  VerticalDivider,
} from './styles';

enum Routes {
  CANDIDATE_AREA = '/area-do-candidato/inicio',
}

const Vacancies: React.FC = () => {
  const router = useRouter();
  const searchParmas = useSearchParams();
  const { type } = useParams<{ type: string }>();
  const [vacancyId, setVacancyId] = useState<string | undefined>(undefined);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    const id = searchParmas.get('id') || undefined;
    setVacancyId(id);
  }, []);

  console.log(type);

  return (
    <PageContainer>
      <LeftContainer>
        <BackButton
          type="button"
          onClick={() => router.push(Routes.CANDIDATE_AREA)}
        >
          <Icon name="ArrowBack" /> Voltar
        </BackButton>
        <VacancyList />
      </LeftContainer>
      <VerticalDivider />
      <VacancyDetails
        id={vacancyId}
        isApplyed
        onApply={() => setSuccessModalOpen(true)}
      />
    </PageContainer>
  );
};

const VacanciesPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Vacancies />
    </Suspense>
  );
};
export default VacanciesPage;

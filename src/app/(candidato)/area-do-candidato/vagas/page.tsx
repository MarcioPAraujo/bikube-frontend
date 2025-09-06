'use client';

import VacancyDetails from '@/components/Vacancy/VacancyDetails/VacancyDetails';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Icons } from '@/components/Icons/Icons';
import { BackButton, PageContainer, VerticalDivider } from './styles';

enum Routes {
  CANDIDATE_AREA = '/area-do-candidato/inicio',
}

const Vacancies: React.FC = () => {
  const router = useRouter();
  const searchParmas = useSearchParams();
  const [vacancyId, setVacancyId] = useState<string | undefined>(undefined);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    const id = searchParmas.get('id') || undefined;
    setVacancyId(id);
  }, []);

  return (
    <PageContainer>
      <div>
        <BackButton
          type="button"
          onClick={() => router.push(Routes.CANDIDATE_AREA)}
        >
          <Icons.ArrowBack /> Voltar
        </BackButton>
        vagas
      </div>
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

'use client';

import VacancyDetails from '@/components/Vacancy/VacancyDetails/VacancyDetails';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Icon } from '@/components/Icons/Icons';
import VacancyList from '@/components/Vacancy/VacancyList/VacancyList';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
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
  const { type } = useParams<{ type: 'aplicadas' | 'abertas' }>();
  const [vacancyId, setVacancyId] = useState<string | undefined>(undefined);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    const id = searchParmas.get('id') || undefined;
    setVacancyId(id);
  }, []);

  return (
    <>
      <SuccessModal
        isOpen={successModalOpen}
        title="Candidatura realizada com sucesso!"
        message="Parabéns por dar mais um passo na sua carreira. Estamos felizes em ajudar você a alcançar seus objetivos profissionais."
        onClose={() => setSuccessModalOpen(false)}
        buttonText="Fechar"
      />

      <PageContainer>
        <LeftContainer>
          <BackButton
            type="button"
            onClick={() => router.push(Routes.CANDIDATE_AREA)}
          >
            <Icon name="ArrowBack" /> Voltar
          </BackButton>
          <VacancyList type={type} setSelectedVacancyId={setVacancyId} />
        </LeftContainer>
        <VerticalDivider />
        <VacancyDetails
          id={vacancyId}
          isApplyed={type === 'aplicadas'}
          onApply={() => setSuccessModalOpen(true)}
        />
      </PageContainer>
    </>
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

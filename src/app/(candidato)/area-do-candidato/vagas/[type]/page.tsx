'use client';

import VacancyDetails from '@/components/Vacancy/VacancyDetails/VacancyDetails';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Icon } from '@/components/Icons/Icons';
import VacancyList from '@/components/Vacancy/VacancyList/VacancyList';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import {
  applyToVacancy,
  getAllVacancies,
  getAppliedVacancies,
  giveUpVacancy,
} from '@/services/vacancy/vacancyService';
import { notifyError } from '@/utils/handleToast';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
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
  const { candidate } = useCandidateAuth();
  const router = useRouter();
  const searchParmas = useSearchParams();
  const { type } = useParams<{ type: 'aplicadas' | 'abertas' }>();
  const [vacancy, setVacancy] = useState<IVacancyListResponse>();
  const [vacancyStep, setVacancyStep] = useState<string>('');
  const [vacancyId, setVacancyId] = useState<string | undefined>(undefined);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successGiveUpModalOpen, setSuccessGiveUpModalOpen] = useState(false);

  const candidateId = candidate?.id ? Number(candidate.id) : 0;

  useEffect(() => {
    const id = searchParmas.get('id') || undefined;
    setVacancyId(id);
    const handleSelectedVacancy = async () => {
      const appliedResult = await getAppliedVacancies(candidateId);
      const applied = appliedResult.data || [];
      const vacanciesResult = await getAllVacancies();
      const vacancies = vacanciesResult.data || [];

      if (!id) return;

      if (type === 'abertas') {
        const vacancy = vacancies.find(v => v.id.toString() === id);
        if (vacancy) {
          setVacancy(vacancy);
        }
      }
      if (type === 'aplicadas') {
        const appliedVacancy = applied.find(v => v.vaga.id.toString() === id);
        if (appliedVacancy) {
          setVacancy(appliedVacancy.vaga);
          setVacancyStep(appliedVacancy.etapa);
        }
      }
    };
    handleSelectedVacancy();
  }, []);

  const onApply = async () => {
    const candidateId = candidate ? Number(candidate.id) : 0;
    const vacancy = Number(vacancyId) || 0;

    const result = await applyToVacancy({
      idcandidato: candidateId,
      idvaga: vacancy,
    });

    if (result.error) {
      notifyError(result.error);
      return;
    }
    setSuccessModalOpen(true);
  };

  const onGiveUp = async () => {
    const candidateId = candidate ? Number(candidate.id) : 0;
    const vacancy = Number(vacancyId) || 0;

    const resutl = await giveUpVacancy({
      idcandidato: candidateId,
      idvaga: vacancy,
    });

    if (resutl.error) {
      notifyError(resutl.error);
      return;
    }
    setSuccessGiveUpModalOpen(true);
  };

  return (
    <>
      <SuccessModal
        isOpen={successGiveUpModalOpen}
        title="Você desistiu da vaga"
        message="Lamentamos que você tenha decidido desistir desta oportunidade. Se mudar de ideia, estaremos aqui para ajudar você a encontrar a vaga ideal."
        onClose={() => setSuccessGiveUpModalOpen(false)}
        buttonText="Fechar"
      />
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
          <VacancyList
            type={type}
            setSelectedVacancyId={setVacancyId}
            setVacancy={setVacancy}
            setVacancyStep={setVacancyStep}
          />
        </LeftContainer>
        <VerticalDivider />
        <VacancyDetails
          id={vacancyId}
          isApplyed={type === 'aplicadas'}
          onApply={onApply}
          onGiveUp={onGiveUp}
          vacancy={vacancy}
          vacancyStep={vacancyStep}
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

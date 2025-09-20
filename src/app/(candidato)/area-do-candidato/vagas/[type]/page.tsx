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
import WarningModal from '@/components/modals/WarningModal/WarningModal';
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
  const [warningModalOpen, setWarningModalOpen] = useState(false);

  const candidateId = candidate?.id ? Number(candidate.id) : 0;

  useEffect(() => {
    const id = searchParmas.get('id') || undefined;
    setVacancyId(id);
    const handleSelectedVacancy = async () => {
      if (!id) return;

      const appliedResult = await getAppliedVacancies(candidateId);
      const applied = appliedResult.data || [];
      const vacanciesResult = await getAllVacancies();
      const vacancies = vacanciesResult.data || [];

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
  }, [successGiveUpModalOpen]);

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
      candidatoid: candidateId,
      vagaid: vacancy,
    });

    if (resutl.error) {
      notifyError(resutl.error);
      return;
    }

    setVacancy(undefined);
    setVacancyId(undefined);
    setSuccessGiveUpModalOpen(true);
  };

  return (
    <>
      <SuccessModal
        isOpen={successGiveUpModalOpen}
        title="Você desistiu da vaga"
        message="Lamentamos que você tenha decidido desistir desta oportunidade. Se mudar de ideia, estaremos aqui para ajudar você a encontrar a vaga ideal."
        onClose={() => {
          setSuccessGiveUpModalOpen(false);
          router.refresh();
        }}
        buttonText="Fechar"
      />
      <WarningModal
        isOpen={warningModalOpen}
        title="Tem certeza que deseja desistir da vaga?"
        message="Ao desistir, você não poderá mais participar do processo seletivo desta vaga."
        cancelText="Cancelar"
        confirmText="Desistir"
        onCancel={() => setWarningModalOpen(false)}
        onConfirm={() => {
          setWarningModalOpen(false);
          onGiveUp();
        }}
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
            vacancyId={vacancyId}
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
          onGiveUp={() => setWarningModalOpen(true)}
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

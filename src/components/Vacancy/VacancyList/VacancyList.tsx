import { Dispatch, SetStateAction } from 'react';
import {
  getAllVacancies,
  getAppliedVacancies,
} from '@/services/vacancy/vacancyService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import AppliedVacancies from './AppliedVacancies';
import AllVacancies from './AllVacancies';

interface IVacancyListProps {
  type: 'aplicadas' | 'abertas';
  vacancyId: string | undefined;
  setSelectedVacancyId: Dispatch<SetStateAction<string | undefined>>;
  setVacancy: Dispatch<SetStateAction<IVacancyListResponse | undefined>>;
  setVacancyStep: Dispatch<SetStateAction<string>>;
}

const VacancyList: React.FC<IVacancyListProps> = ({
  type,
  vacancyId,
  setSelectedVacancyId,
  setVacancy,
  setVacancyStep,
}) => {
  const { candidate } = useCandidateAuth();

  const candidateId = candidate?.id ? Number(candidate.id) : 0;

  const {
    data: allVacancies,
    isError: allVacanciesError,
    isPending: allVacanciesPending,
  } = useQuery({
    queryKey: ['vacancies'],
    queryFn: async () => {
      const result = await getAllVacancies();
      return result.data || [];
    },
    placeholderData: keepPreviousData,
  });
  const {
    data: applied,
    isError: appliedError,
    isPending: appliedPending,
  } = useQuery({
    queryKey: ['appliedVacancies', candidateId],
    queryFn: async () => {
      const result = await getAppliedVacancies(candidateId);
      return result.data || [];
    },
    placeholderData: keepPreviousData,
  });

  if (type === 'aplicadas') {
    return (
      <AppliedVacancies
        applied={applied}
        isError={appliedError}
        isPending={appliedPending}
        vacancyId={vacancyId}
        setSelectedVacancyId={setSelectedVacancyId}
        setVacancy={setVacancy}
        setVacancyStep={setVacancyStep}
      />
    );
  }

  return (
    <AllVacancies
      allVacancies={allVacancies}
      applied={applied}
      isError={allVacanciesError}
      isPending={allVacanciesPending}
      vacancyId={vacancyId}
      setSelectedVacancyId={setSelectedVacancyId}
      setVacancy={setVacancy}
    />
  );
};
export default VacancyList;

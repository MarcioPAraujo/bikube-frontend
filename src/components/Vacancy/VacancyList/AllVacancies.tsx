import { IVacancyListResponse } from '@/interfaces/vacancy/vacancyListResponse';
import { Dispatch, SetStateAction } from 'react';
import { IAppliedVacanciesListResponse } from '@/interfaces/vacancy/appliedVacanciesListResponse';
import VacancyItem from '../VacancyItem/VacancyItem';
import { TitleContainer, VacancyListContainer } from './styles';

interface IAllVacancyListProps {
  allVacancies: IVacancyListResponse[] | undefined;
  applied: IAppliedVacanciesListResponse[] | undefined;
  isError: boolean;
  isPending: boolean;
  vacancyId: string | undefined;
  setSelectedVacancyId: Dispatch<SetStateAction<string | undefined>>;
  setVacancy: Dispatch<SetStateAction<IVacancyListResponse | undefined>>;
}

const AllVacancies: React.FC<IAllVacancyListProps> = ({
  allVacancies,
  applied,
  isError,
  isPending,
  vacancyId,
  setSelectedVacancyId,
  setVacancy,
}) => {
  if (isPending) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar vagas. Tente novamente mais tarde.</div>;
  }

  if (!allVacancies || allVacancies.length === 0) {
    return <div>Nenhuma vaga encontrada.</div>;
  }

  // Filter out vacancies that the candidate has already applied to
  const appliedVacanciesIds = Array.isArray(applied)
    ? new Set(applied.map(item => item.vaga.id))
    : new Set<number>();
  const filteredVacancies = Array.isArray(allVacancies)
    ? allVacancies.filter(
        vacancy =>
          !appliedVacanciesIds.has(vacancy.id) && vacancy.status === 'ativo',
      )
    : [];

  if (filteredVacancies.length === 0) {
    return <div>Nenhuma vaga encontrada.</div>;
  }

  return (
    <div>
      <TitleContainer>
        <h2>Vagas</h2>
      </TitleContainer>
      <VacancyListContainer>
        {filteredVacancies.map(item => (
          <VacancyItem
            key={item.id}
            vacancyId={vacancyId}
            selectVacancy={() => {
              setSelectedVacancyId(item.id.toString());
              setVacancy(item);
            }}
            vacancy={item}
          />
        ))}
      </VacancyListContainer>
    </div>
  );
};
export default AllVacancies;

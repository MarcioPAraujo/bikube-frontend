'use client';

import { getAllVacancies } from '@/services/vacancy/vacancyService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Field, FieldLabel, FieldsContainer, FieldValue } from './styles';

const vacancyLevelRecord: Record<string, string> = {
  inciante: 'Júnior',
  intermediario: 'Pleno',
  avancado: 'Sênior',
};

const VacancyDetailsPage: React.FC = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const { data, isPlaceholderData } = useQuery({
    queryKey: ['vacancies', vacancyId],
    queryFn: async () => {
      const result = await getAllVacancies();
      if (!result.data) return [];
      const vacancy = result.data.filter(v => v.id === Number(vacancyId));
      return vacancy;
    },
    placeholderData: keepPreviousData,
  });

  if (!data && !isPlaceholderData) return null;

  if (!data || data.length === 0) {
    return (
      <div>
        <h1>Detalhes da Vaga</h1>
        <p>Vaga não encontrada.</p>
      </div>
    );
  }
  const vacancy = data[0];

  return (
    <FieldsContainer>
      <Field>
        <FieldLabel>Tipo de contrato</FieldLabel>
        <FieldValue>{vacancy.tipoContrato}</FieldValue>
      </Field>
      <Field>
        <FieldLabel>Nível da vaga</FieldLabel>
        <FieldValue>
          {vacancyLevelRecord[vacancy.nivel] || vacancy.nivel}
        </FieldValue>
      </Field>
      <Field>
        <FieldLabel>Local</FieldLabel>
        <FieldValue>{vacancy.localizacao}</FieldValue>
      </Field>
      <Field>
        <FieldLabel>Modelo de trabalho</FieldLabel>
        <FieldValue>{vacancy.modelo}</FieldValue>
      </Field>
      <Field>
        <FieldLabel>Descrição da vaga</FieldLabel>
        <FieldValue>{vacancy.descricao}</FieldValue>
      </Field>
      <Field>
        <FieldLabel>Informações adicionais</FieldLabel>
        <FieldValue>{vacancy.informacoes}</FieldValue>
      </Field>
    </FieldsContainer>
  );
};
export default VacancyDetailsPage;

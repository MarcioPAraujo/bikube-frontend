'use client';

import {
  closeVacancy,
  getAllVacancies,
} from '@/services/vacancy/vacancyService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { useState } from 'react';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { notifyError } from '@/utils/handleToast';
import {
  Field,
  FieldLabel,
  FieldsContainer,
  FieldValue,
  PageContainer,
} from './styles';

/**
 * Mapping of vacancy levels to their display names
 */
const vacancyLevelRecord: Record<string, string> = {
  inciante: 'Júnior',
  intermediario: 'Pleno',
  avancado: 'Sênior',
};

const VacancyDetailsPage: React.FC = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  /**
   * Fetches the vacancy details using React Query
   * @returns The vacancy data along with fetching status and refetch function
   */
  const { data, isPlaceholderData, refetch } = useQuery({
    queryKey: ['vacancies', vacancyId],
    queryFn: async () => {
      const result = await getAllVacancies();
      if (!result.data) return [];
      // Filters the vacancy by ID
      const vacancy = result.data.filter(v => v.id === Number(vacancyId));
      return vacancy;
    },
    placeholderData: keepPreviousData,
  });

  /**
   * Handles the closure of a vacancy
   * Closes the vacancy and shows success or error modals accordingly
   */
  const handleCloseVacancy = async () => {
    const response = await closeVacancy(Number(vacancyId));
    if (response.error) {
      notifyError(response.error);
      setWarningModalOpen(false);
      return;
    }
    refetch();
    setSuccessModalOpen(true);
    setWarningModalOpen(false);
  };

  // First load or vacancy not found
  if (!data && !isPlaceholderData) return null;

  // Vacancy not found
  if (!data || data.length === 0) {
    return (
      <div>
        <h1>Detalhes da Vaga</h1>
        <p>Vaga não encontrada.</p>
      </div>
    );
  }

  /**
   * Stores the vacancy details, which is the first item in the data array
   * since we filtered by vacancyId in the query function
   */
  const vacancy = data[0];

  return (
    <>
      <WarningModal
        isOpen={warningModalOpen}
        title="Encerrar Vaga"
        message="Tem certeza que deseja encerrar esta vaga? Esta ação não pode ser desfeita."
        confirmText="Confirmar"
        cancelText="Cancelar"
        onConfirm={handleCloseVacancy}
        onCancel={() => setWarningModalOpen(false)}
      />
      <SuccessModal
        isOpen={successModalOpen}
        title="Vaga Encerrada"
        message="A vaga foi encerrada com sucesso."
        buttonText="Fechar"
        onClose={() => setSuccessModalOpen(false)}
      />

      <PageContainer>
        <div>
          <DefaultButton
            text="Encerrar Vaga"
            variant="bordered"
            onClick={() => setWarningModalOpen(true)}
            disabled={vacancy.status === 'finalizado'}
          />
        </div>

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
      </PageContainer>
    </>
  );
};
export default VacancyDetailsPage;

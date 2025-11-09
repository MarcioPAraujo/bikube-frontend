import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { applySickLeave } from '@/services/funcionarios/funcionariosService';
import { notifyError } from '@/utils/handleToast';
import {
  ApplyLeaveSickSchema,
  IApplyLeaveSickSchema,
} from '@/validation/ApplyLeaveSickSchema';
import ModalBackground from '../elements/ModalBackground';
import {
  Button,
  ButtonsContainer,
  CancelButton,
  Digit,
  DigitContainer,
  Display,
  Form,
  SaveButton,
  SubmitSection,
  Title,
} from './styles';
import SuccessModal from '../SuccessModal/SuccessModal';

interface IApplyLeaveSickModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string;
  refetch: () => void;
}

const ApplyLeaveSickModal: React.FC<IApplyLeaveSickModalProps> = ({
  isOpen,
  onClose,
  employeeId,
  refetch,
}) => {
  const {
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IApplyLeaveSickSchema>({
    resolver: yupResolver(ApplyLeaveSickSchema),
    mode: 'onBlur',
    defaultValues: {
      days: '00',
    },
  });
  const [successModal, setSuccessModal] = useState(false);

  const days = watch('days');

  const onFormSubmit = async (data: IApplyLeaveSickSchema) => {
    // Implement the logic to sell vacation days here

    const response = await applySickLeave(employeeId, parseInt(data.days, 10));

    if (response.error) {
      notifyError(response.error);
      return;
    }

    refetch();
    setSuccessModal(true);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    reset();
    setSuccessModal(false);
    onClose();
  };

  const incrementDays = () => {
    let currentDays = parseInt(days, 10) || 0;
    if (currentDays < 10) {
      currentDays += 1;
      const newDaysString = currentDays.toString().padStart(2, '0');
      setValue('days', newDaysString);
      trigger('days');
    }
  };

  const decrementDays = () => {
    let currentDays = parseInt(days, 10) || 0;
    if (currentDays > 1) {
      currentDays -= 1;
      const newDaysString = currentDays.toString().padStart(2, '0');
      setValue('days', newDaysString);
      trigger('days');
    }
  };

  if (!isOpen) return null;

  if (successModal) {
    return (
      <SuccessModal
        isOpen={successModal}
        title="Sucesso"
        message="Atestado aplicado com sucesso!"
        buttonText="Fechar"
        onClose={handleClose}
      />
    );
  }

  return (
    <ModalBackground>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Title>Aplicar atestado</Title>
        <Display>
          <DigitContainer>
            <Digit>{days.split('')[0] || '0'}</Digit>
            <Digit>{days.split('')[1] || '0'}</Digit>
          </DigitContainer>
          <ButtonsContainer>
            <Button type="button" onClick={incrementDays}>
              +
            </Button>
            <Button type="button" onClick={decrementDays}>
              -
            </Button>
          </ButtonsContainer>
        </Display>
        {errors.days && <p>{errors.days.message}</p>}
        <SubmitSection>
          <CancelButton
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </CancelButton>
          <SaveButton
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? 'saving' : ''}
          >
            {isSubmitting ? 'Processando...' : 'Salvar'}
          </SaveButton>
        </SubmitSection>
      </Form>
    </ModalBackground>
  );
};
export default ApplyLeaveSickModal;

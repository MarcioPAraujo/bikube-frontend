import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  sellVacationSchema,
  ISellVacationSchema,
} from '@/validation/SellVacationSchema';
import { useState } from 'react';
import { sellEmployeeVacationDays } from '@/services/funcionarios/funcionariosService';
import { notifyError } from '@/utils/handleToast';
import ModalBackground from '../elements/ModalBackground';
import {
  Button,
  ButtonsContainer,
  CancelButton,
  Digit,
  DigitContainer,
  Display,
  Form,
  Message,
  SaveButton,
  SubmitSection,
  Title,
} from './styles';
import SuccessModal from '../SuccessModal/SuccessModal';

interface ISellVacationModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string;
  refetch: () => void;
}

const SellVacationModal: React.FC<ISellVacationModalProps> = ({
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
  } = useForm<ISellVacationSchema>({
    resolver: yupResolver(sellVacationSchema),
    mode: 'onBlur',
    defaultValues: {
      daysToSell: '00',
    },
  });
  const [successModal, setSuccessModal] = useState(false);

  const daysToSell = watch('daysToSell');

  const onFormSubmit = async (data: ISellVacationSchema) => {
    // Implement the logic to sell vacation days here

    const response = await sellEmployeeVacationDays(
      employeeId,
      parseInt(data.daysToSell, 10),
    );

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
    let currentDays = parseInt(daysToSell, 10) || 0;
    if (currentDays < 10) {
      currentDays += 1;
      const newDaysString = currentDays.toString().padStart(2, '0');
      setValue('daysToSell', newDaysString);
      trigger('daysToSell');
    }
  };

  const decrementDays = () => {
    let currentDays = parseInt(daysToSell, 10) || 0;
    if (currentDays > 1) {
      currentDays -= 1;
      const newDaysString = currentDays.toString().padStart(2, '0');
      setValue('daysToSell', newDaysString);
      trigger('daysToSell');
    }
  };

  if (!isOpen) return null;

  if (successModal) {
    return (
      <SuccessModal
        isOpen={successModal}
        title="Sucesso"
        message="Dias de férias vendidos com sucesso!"
        buttonText="Fechar"
        onClose={handleClose}
      />
    );
  }

  return (
    <ModalBackground>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Title>Vender Férias</Title>
        <Message>
          Isso se trata de solicitar a venda de dias de férias. Escolha a
          quantidade, quando as férias forem aprovadas os dias serão vendidos.
        </Message>
        <Display>
          <DigitContainer>
            <Digit>{daysToSell.split('')[0] || '0'}</Digit>
            <Digit>{daysToSell.split('')[1] || '0'}</Digit>
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
        {errors.daysToSell && <p>{errors.daysToSell.message}</p>}
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
            {isSubmitting ? 'Processando...' : 'Vender Férias'}
          </SaveButton>
        </SubmitSection>
      </Form>
    </ModalBackground>
  );
};
export default SellVacationModal;

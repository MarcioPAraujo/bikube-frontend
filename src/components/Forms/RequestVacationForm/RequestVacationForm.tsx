import { DefaultButton } from '@/components/Buttons/DefaultButton';
import InputComponent from '@/components/Inputs/InputComponent';
import ModalBackground from '@/components/modals/elements/ModalBackground';
import {
  VacationRequestData,
  VacationRequestSchema,
} from '@/validation/VacationRequestSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import { useAuth } from '@/hooks/useAuth';
import {
  IVacationBodyRequest,
  requestVacation,
} from '@/services/vacations/vacationService';
import { format, parse } from 'date-fns';
import { notifyError } from '@/utils/handleToast';
import { VacationForm } from './styles';

interface IRequestVacationFormProps {
  isOpen: boolean;
  onClose: () => void;
  refetchVacations: () => void;
}

const RequestVacationForm: React.FC<IRequestVacationFormProps> = ({
  isOpen,
  onClose,
  refetchVacations,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<VacationRequestData>({
    mode: 'onTouched',
    resolver: yupResolver(VacationRequestSchema),
  });
  const { user } = useAuth();
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const onSubmit = async (data: VacationRequestData) => {
    const parsedStartDate = parse(data.startDate, 'dd/MM/yyyy', new Date());
    const parsedEndDate = parse(data.endDate, 'dd/MM/yyyy', new Date());

    const body: IVacationBodyRequest = {
      idfuncionario: user?.id || '',
      dataInicio: format(parsedStartDate, 'yyyy-MM-dd'),
      dataFim: format(parsedEndDate, 'yyyy-MM-dd'),
    };

    console.log(body);

    const response = await requestVacation(body);
    if (response.error) {
      notifyError(response.error);
      return;
    }
    refetchVacations();
    setSuccessModal(true);
  };

  const handleClose = () => {
    setSuccessModal(false);
    reset();
    onClose();
  };

  const handleDateChange = (date: string, field: keyof VacationRequestData) => {
    const formatedDate = ddmmyyyyMask(date, 'any');
    setValue(field, formatedDate);
    trigger(field);
  };

  if (successModal) {
    return (
      <SuccessModal
        isOpen={successModal}
        title="Solicitação Enviada"
        message="Sua solicitação de férias foi enviada com sucesso e está pendente de aprovação."
        buttonText="Fechar"
        onClose={handleClose}
      />
    );
  }

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <VacationForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Solicitar férias</h2>
        <InputComponent
          id="startDate"
          labelText="Data de Início"
          placeholder="dd/mm/aaaa"
          disabled={isSubmitting}
          register={register('startDate', {
            onChange: e => handleDateChange(e.target.value, 'startDate'),
          })}
          errorMessage={errors.startDate?.message}
        />
        <InputComponent
          id="endDate"
          labelText="Data de Fim"
          placeholder="dd/mm/aaaa"
          disabled={isSubmitting}
          register={register('endDate', {
            onChange: e => handleDateChange(e.target.value, 'endDate'),
          })}
          errorMessage={errors.endDate?.message}
        />
        <DefaultButton text="Soliciar" type="submit" />
        <DefaultButton
          text="Cancelar"
          variant="bordered"
          onClick={handleClose}
        />
      </VacationForm>
    </ModalBackground>
  );
};
export default RequestVacationForm;

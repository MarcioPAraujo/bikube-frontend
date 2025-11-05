import {
  AbsenceJustificationSchema,
  AbsenceJustificationSchemaType,
} from '@/validation/AbsenceJustificationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { createAbsencyJustification } from '@/services/mirror/mirrorService';
import { notifyError } from '@/utils/handleToast';
import { useState } from 'react';
import Textarea from '@/components/Inputs/Textarea/Textarea';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import ModalBackground from '../elements/ModalBackground';
import SuccessModal from '../SuccessModal/SuccessModal';
import { Form } from './styles';

interface AbsenceJustificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayId: number;
  refetch: () => void;
}

const AbsenceJustificationModal: React.FC<AbsenceJustificationModalProps> = ({
  isOpen,
  onClose,
  dayId,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AbsenceJustificationSchemaType>({
    resolver: yupResolver(AbsenceJustificationSchema),
  });
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const onFormSubmit = async (
    justification: AbsenceJustificationSchemaType,
  ) => {
    const response = await createAbsencyJustification({
      iditem: dayId,
      descricao: justification.descricao,
    });
    if (response.error) {
      notifyError(response.error);
      return;
    }
    setSuccessModal(true);
  };

  const handleClose = () => {
    reset();
    onClose();
    setSuccessModal(false);
  };

  if (!isOpen) return null;

  if (successModal) {
    return (
      <SuccessModal
        isOpen={successModal}
        title="Sucesso!"
        message="Justificativa criada com sucesso."
        buttonText="Fechar"
        onClose={() => {
          handleClose();
          refetch();
        }}
      />
    );
  }

  return (
    <ModalBackground>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <h2>Justificativa de Ausência</h2>
        <Textarea
          id="justification"
          label="Justificativa"
          placeholder="Insira a justificativa da ausência"
          register={register('descricao')}
          error={errors.descricao}
        />
        <DefaultButton type="submit" text="Salvar" disabled={isSubmitting} />
        <DefaultButton
          type="button"
          text="Cancelar"
          variant="bordered"
          onClick={handleClose}
        />
      </Form>
    </ModalBackground>
  );
};
export default AbsenceJustificationModal;

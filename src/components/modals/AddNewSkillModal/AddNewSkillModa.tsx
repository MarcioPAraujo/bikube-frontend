import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { notifyError } from '@/utils/handleToast';
import { useState } from 'react';
import InputComponent from '@/components/Inputs/InputComponent';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { SkillFormData, SkillSchema } from '@/validation/SkillSchema';
import { createSkill } from '@/services/skilss/skilssService';
import SuccessModal from '../SuccessModal/SuccessModal';
import ModalBackground from '../elements/ModalBackground';
import { Form, ModalContent, Title } from './styles';

interface AddNewSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddNewSkillModal: React.FC<AddNewSkillModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: yupResolver(SkillSchema),
    mode: 'onTouched',
  });
  const [successModal, setSuccessModal] = useState(false);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit = async (data: SkillFormData) => {
    const resoponse = await createSkill(data.nome);
    if (resoponse.error) {
      notifyError(resoponse.error);
      return;
    }
    setSuccessModal(true);
  };

  if (!isOpen) return null;

  if (successModal) {
    return (
      <SuccessModal
        isOpen={successModal}
        title="Sucesso"
        message="Habilidade adicionada com sucesso!"
        buttonText="Fechar"
        onClose={handleClose}
      />
    );
  }

  return (
    <ModalBackground>
      <ModalContent>
        <Title>Adicionar nova habilidade</Title>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <InputComponent
            id="language"
            labelText="Habilidade"
            placeholder="Insira o nome da habilidade"
            register={register('nome')}
            errorMessage={errors.nome?.message}
          />
          <DefaultButton type="submit" text="Adicionar habilidade" />
        </Form>
      </ModalContent>
    </ModalBackground>
  );
};
export default AddNewSkillModal;

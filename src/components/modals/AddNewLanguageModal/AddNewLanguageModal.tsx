import { useForm } from 'react-hook-form';
import { LanguageFormData, languageSchema } from '@/validation/languageSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { createLanguage } from '@/services/language/languageService';
import { notifyError } from '@/utils/handleToast';
import { useState } from 'react';
import InputComponent from '@/components/Inputs/InputComponent';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import SuccessModal from '../SuccessModal/SuccessModal';
import ModalBackground from '../elements/ModalBackground';
import { Form, ModalContent, Title } from './styles';

interface AddNewSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddNewLanguageModal: React.FC<AddNewSkillModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LanguageFormData>({
    resolver: yupResolver(languageSchema),
    mode: 'onTouched',
  });
  const [successModal, setSuccessModal] = useState(false);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit = async (data: LanguageFormData) => {
    const resoponse = await createLanguage(data.idioma);
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
        message="Idioma adicionado com sucesso!"
        buttonText="Fechar"
        onClose={handleClose}
      />
    );
  }

  return (
    <ModalBackground>
      <ModalContent>
        <Title>Adicionar novo idoma</Title>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <InputComponent
            id="language"
            labelText="Idioma"
            placeholder="Insira o nome do idioma"
            register={register('idioma')}
            errorMessage={errors.idioma?.message}
          />
          <DefaultButton type="submit" text="Adicionar idioma" />
        </Form>
      </ModalContent>
    </ModalBackground>
  );
};
export default AddNewLanguageModal;

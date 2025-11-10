import { useForm } from 'react-hook-form';
import { LanguageFormData, languageSchema } from '@/validation/languageSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { createLanguage } from '@/services/language/languageService';
import { notifyError } from '@/utils/handleToast';
import { useState } from 'react';
import InputComponent from '@/components/Inputs/InputComponent';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import IconButton from '@/components/Buttons/IconButton';
import { Icon } from '@/components/Icons/Icons';
import SuccessModal from '../SuccessModal/SuccessModal';
import ModalBackground from '../elements/ModalBackground';
import { Form, ModalContent, Title, TitleWrapper } from './styles';
import WarningModal from '../WarningModal/WarningModal';

interface AddNewSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}
const AddNewLanguageModal: React.FC<AddNewSkillModalProps> = ({
  isOpen,
  onClose,
  refetch,
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
  const [warningModal, setWarningModal] = useState(false);

  const handleClose = () => {
    reset();
    onClose();
    setSuccessModal(false);
    setWarningModal(false);
  };

  const onFormSubmit = async (data: LanguageFormData) => {
    const resoponse = await createLanguage(data.idioma);
    if (resoponse.error) {
      notifyError(resoponse.error);
      return;
    }
    refetch();
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

  if (warningModal) {
    return (
      <WarningModal
        isOpen={warningModal}
        title="Cancelar adição de novo idioma?"
        message="Tem certeza que deseja cancelar? As informações preenchidas serão perdidas."
        confirmText="Confirmar"
        cancelText="Cancelar"
        onConfirm={handleClose}
        onCancel={() => setWarningModal(false)}
      />
    );
  }

  return (
    <ModalBackground>
      <ModalContent>
        <TitleWrapper>
          <Title>Adicionar novo idioma</Title>
          <IconButton
            onClick={() => setWarningModal(true)}
            iconNode={<Icon name="CloseIcon" />}
          />
        </TitleWrapper>
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

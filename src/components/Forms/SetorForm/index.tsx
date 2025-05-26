import { FC, useState } from 'react';
import { BlurBackground, ButtonContainer, Container, ErrorMessage, Field, Form, TitleContainer } from './styles';
import IconButton from '@/components/Buttons/IconButton';
import { Icons } from '@/components/Icons/Icons';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sectorSchema, SectorFormValues } from '@/validation/setor/sectorSchema';
import { createSector } from '@/services/setor/setorService';
import { notifyError } from '@/utils/handleToast';
import SuccessModal from '@/components/modals/SuccessModal';

interface SectorFormProps {
  isOpen: boolean;
  onClose: () => void;
  successfulSubmit: () => void;
}

export const SectorForm: FC<SectorFormProps> = ({ isOpen, onClose, successfulSubmit }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectorFormValues>({
    resolver: yupResolver(sectorSchema),
    mode: 'onChange',
  });

  const onFormSubmit = async (data: SectorFormValues) => {
    console.log('Form submitted with data:', data);

    const response = await createSector(data.nome);
    if (response.error) {
      notifyError(response.error);
      return;
    }
    setSuccess(true);
  };

  const onCloseModal = () => {
    onClose();
    reset();
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <SuccessModal
        isOpen={success}
        onClose={() => {
          setSuccess(false);
          successfulSubmit();
          onCloseModal();
        }}
        message="Setor cadastrado com sucesso!"
        buttonText="Fechar"
        title="Setor Cadastrado"
      />
    );
  }

  return (
    <Container>
      <BlurBackground />
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <TitleContainer>
          <h2>Cadastrar Setor</h2>
          <IconButton onClick={onCloseModal} icon={Icons.CloseIcon} />
        </TitleContainer>
        <Field>
          <label htmlFor="sectorName">Nome do Setor:</label>
          <input type="text" id="sectorName" placeholder="Insira o nome do setor..." {...register('nome')} />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Field>
        <ButtonContainer>
          <DefaultButton text="Salvar" type="submit" />
          <DefaultButton text="Cancelar" onClick={onCloseModal} type="button" classname="bordered" />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

import { FC } from 'react';
import { BlurBackground, ButtonContainer, Container, Field, Form, TitleContainer } from './styles';
import IconButton from '@/components/Buttons/IconButton';
import { Icons } from '@/components/Icons/Icons';
import { DefaultButton } from '@/components/Buttons/DefaultButton';

interface SectorFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SectorForm: FC<SectorFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <Container>
      <BlurBackground />
      <Form>
        <TitleContainer>
          <h2>Cadastrar Setor</h2>
          <IconButton onClick={onClose} icon={Icons.CloseIcon} />
        </TitleContainer>
        <Field>
          <label htmlFor="sectorName">Nome do Setor:</label>
          <input type="text" id="sectorName" name="sectorName" placeholder="Insira o nome do setor..." />
        </Field>
        <ButtonContainer>
          <DefaultButton text="Salvar" type="submit" />
          <DefaultButton text="Cancelar" onClick={onClose} type="button" classname="bordered" />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

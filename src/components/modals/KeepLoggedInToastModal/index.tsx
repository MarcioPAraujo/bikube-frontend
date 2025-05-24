import { FC } from 'react';
import { BlurBackground, Button, ButtonGroup, Container, Message, ModalWrapper } from './styles';

interface IKeepLoggedInToastModalProps {
  isOpen: boolean;
  onStayLoggedIn: () => void;
  onJustLogin: () => void;
}

export const KeepLoggedInToastModal: FC<IKeepLoggedInToastModalProps> = ({ onStayLoggedIn, onJustLogin, isOpen }) => {
  if (!isOpen) return null;

  return (
    <Container>
      <BlurBackground />
      <ModalWrapper>
        <Message>Login realizado com sucesso, deseja permanecer logado?</Message>
        <ButtonGroup>
          <Button onClick={onStayLoggedIn}>Sim, permanecer logado</Button>
          <Button onClick={onJustLogin} className="not-logged-in">
            Não, apenas fazer login
          </Button>
        </ButtonGroup>
      </ModalWrapper>
    </Container>
  );
};

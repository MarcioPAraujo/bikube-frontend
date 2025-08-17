import { BlurBackground, Button, ButtonContainer, Container, Message, ModalContent, Title } from './styles';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface WarningModalProps {
  isOpen: boolean;
  message: string;
  title: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  message,
  title,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  return (
    <Container>
      <BlurBackground />
      <ModalContent>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button type="button" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button type="button" onClick={onConfirm} className="filled">
            {confirmText}
          </Button>
        </ButtonContainer>
      </ModalContent>
    </Container>
  );
};
export default WarningModal;

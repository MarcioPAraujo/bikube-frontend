import {
  BlurBackground,
  Button,
  ButtonContainer,
  Container,
  ContentWrapper,
  IconContainer,
  Message,
  ModalContent,
  Title,
} from './styles';
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
        <IconContainer>
          <IoCloseCircleOutline color="white" size={70} />
        </IconContainer>
        <ContentWrapper>
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
        </ContentWrapper>
      </ModalContent>
    </Container>
  );
};
export default WarningModal;

import {
  BlurBackground,
  Button,
  Container,
  Message,
  ModalContent,
  Title,
} from './styles';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title: string;
  buttonText: string;
}
const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
  title,
  buttonText,
}) => {
  if (!isOpen) return null;
  return (
    <Container>
      <BlurBackground />
      <ModalContent>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Button type="button" onClick={onClose}>
          {buttonText}
        </Button>
      </ModalContent>
    </Container>
  );
};
export default SuccessModal;

import { GoIssueClosed } from 'react-icons/go';
import {
  BlurBackground,
  Button,
  Container,
  ContentWrapper,
  IconContainer,
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
const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message, title, buttonText }) => {
  if (!isOpen) return null;
  return (
    <Container>
      <BlurBackground />
      <ModalContent>
        <IconContainer>
          <GoIssueClosed color="white" size={50} />
        </IconContainer>
        <ContentWrapper>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <Button type="button" onClick={onClose}>
            {buttonText}
          </Button>
        </ContentWrapper>
      </ModalContent>
    </Container>
  );
};
export default SuccessModal;

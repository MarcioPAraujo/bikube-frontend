import ModalBackground from '../elements/ModalBackground';
import {
  CloseButton,
  DateDescription,
  MessagesContainer,
  Textarea,
  Title,
} from './messageDetailsModal';

interface IMessageDetailsModal {
  isOpen: boolean;
  onClose: () => void;
  messageId: string | null;
}
const MessageDetailsModal: React.FC<IMessageDetailsModal> = ({
  isOpen,
  onClose,
  messageId,
}) => {
  if (!isOpen || !messageId) return null;
  return (
    <ModalBackground>
      <MessagesContainer>
        <Title>Assunto da mensagem</Title>
        <DateDescription>
          <p>Data: 12/12/2024</p>
        </DateDescription>
        <Textarea
          readOnly
          value="Conteúdo da mensagem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <CloseButton type="button" onClick={onClose}>
          Fechar
        </CloseButton>
      </MessagesContainer>
    </ModalBackground>
  );
};
export default MessageDetailsModal;

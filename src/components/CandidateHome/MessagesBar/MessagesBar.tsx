import { Icon } from '@/components/Icons/Icons';
import { useEffect, useRef, useState } from 'react';
import MessageDetailsModal from '@/components/modals/MessageDetailsModal/MessageDetailsModal';
import {
  Bar,
  BlurBackground,
  Container,
  Content,
  DateMessage,
  Message,
  MessageButton,
  MessageWrapper,
} from './styles';

interface IMessageBar {
  isOpen: boolean;
  onClose: () => void;
}

const messages = Array.from({ length: 20 }, (_, index) => ({
  id: `msg-${index + 1}`,
  content: `lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, blanditiis. Quasi voluptates nemo, iure natus saepe, iste aut adipisci a quod ducimus doloremque sequi, non nisi vero quos excepturi eius? ${
    index + 1
  }`,
  date: '22/11/2024',
}));

const MessagesBar: React.FC<IMessageBar> = ({ isOpen, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const [messageId, setMessageId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!barRef.current) return;
      if (barRef.current.contains(event.target as Node)) return;
      onClose();
      setMessageId(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <Container>
      <BlurBackground />
      <Bar ref={barRef}>
        <MessageDetailsModal
          isOpen={showDetails}
          onClose={() => {
            setShowDetails(false);
            setMessageId(null);
          }}
          messageId={messageId}
        />
        {messages.map(msg => (
          <Message key={msg.id}>
            <DateMessage>{msg.date}</DateMessage>
            <Content>
              <MessageButton
                type="button"
                onClick={() => {
                  setShowDetails(true);
                  setMessageId(msg.id);
                }}
              >
                <Icon name="Mail" />
              </MessageButton>
              <MessageWrapper>
                <p>{msg.content}</p>
              </MessageWrapper>
            </Content>
          </Message>
        ))}
      </Bar>
    </Container>
  );
};
export default MessagesBar;

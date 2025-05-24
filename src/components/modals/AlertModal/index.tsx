import { FC } from 'react';
import { BlurBackground, Button, Container, Message, ModalContent } from './styles';
import { IIcon } from '@/components/Icons/IIcon';

interface IAlertModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  message: string;
  textButton: string;
  blocked?: boolean;
}
export const AlertLoginTriesModal: FC<IAlertModalProps> = (props: IAlertModalProps) => {
  const { isOpen, message, onClose, textButton, blocked = false } = props;

  if (!isOpen) return null;

  return (
    <Container>
      <BlurBackground />
      <ModalContent>
        <IIcon />
        <Message>{message}</Message>
        {!blocked && (
          <Button type="button" onClick={onClose}>
            {textButton}
          </Button>
        )}
      </ModalContent>
    </Container>
  );
};

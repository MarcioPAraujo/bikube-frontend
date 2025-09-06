import IconButton from '@/components/Buttons/IconButton';
import { Icon } from '@/components/Icons/Icons';
import { Title, TitleContainer } from './styles';

interface ITitleProps {
  text: string;
  onClose?: () => void;
}
const ModalTitle: React.FC<ITitleProps> = ({ text, onClose }) => {
  return (
    <TitleContainer>
      <Title>{text}</Title>
      {onClose && (
        <IconButton iconNode={<Icon name="CloseIcon" />} onClick={onClose} />
      )}
    </TitleContainer>
  );
};
export default ModalTitle;

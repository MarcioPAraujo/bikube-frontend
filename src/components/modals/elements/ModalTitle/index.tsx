import IconButton from '@/components/Buttons/IconButton';
import { Icons } from '@/components/Icons/Icons';
import { Title, TitleContainer } from './styles';

interface ITitleProps {
  text: string;
  onClose?: () => void;
}
const ModalTitle: React.FC<ITitleProps> = ({ text, onClose }) => {
  return (
    <TitleContainer>
      <Title>{text}</Title>
      {onClose && <IconButton icon={Icons.CloseIcon} onClick={onClose} />}
    </TitleContainer>
  );
};
export default ModalTitle;

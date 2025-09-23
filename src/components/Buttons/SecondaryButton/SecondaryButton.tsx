import { Button } from './styles';

interface SecondaryButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};
export default SecondaryButton;

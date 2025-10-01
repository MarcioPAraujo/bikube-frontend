import { Button } from './styles';

interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  formId?: string;
}
const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type = 'button',
  formId,
}) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled} form={formId}>
      {text}
    </Button>
  );
};
export default SecondaryButton;

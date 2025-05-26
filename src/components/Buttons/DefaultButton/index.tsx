import { FC } from 'react';
import { Button } from './styles';

interface DefaultButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export const DefaultButton: FC<DefaultButtonProps> = ({ text, onClick, disabled = false, type = 'button' }) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled} className="default-button">
      {text}
    </Button>
  );
};

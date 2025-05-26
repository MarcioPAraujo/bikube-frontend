import { FC } from 'react';
import { Button } from './styles';

interface DefaultButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  classname?: 'bordered';
}
export const DefaultButton: FC<DefaultButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type = 'button',
  classname,
}) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled} className={classname}>
      {text}
    </Button>
  );
};

import { ElementType, FC, ReactNode } from 'react';
import { Button } from './styles';
import { CSSProperties } from 'styled-components';

interface DefaultButtonProps {
  text: string;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  classname?: string;
  styles?: CSSProperties;
}
export const DefaultButton: FC<DefaultButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type = 'button',
  classname,
  icon: Icon,
  iconPosition,
  styles,
}) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled} className={classname} style={styles}>
      {Icon && iconPosition === 'left' && <Icon />}
      {text}
      {Icon && iconPosition === 'right' && <Icon />}
    </Button>
  );
};

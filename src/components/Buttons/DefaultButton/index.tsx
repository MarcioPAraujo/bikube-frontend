import { ElementType, FC } from 'react';
import { CSSProperties } from 'styled-components';
import { Button } from './styles';

interface DefaultButtonProps {
  text: string;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  classname?: string;
  variant?: 'bordered' | 'default';
  styles?: CSSProperties;
  formId?: string;
}
export const DefaultButton: FC<DefaultButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type = 'button',
  classname,
  icon: Icon,
  iconPosition,
  variant = 'default',
  styles,
  formId,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classname} ${variant}`}
      style={styles}
      form={formId}
    >
      {Icon && iconPosition === 'left' && <Icon />}
      {text}
      {Icon && iconPosition === 'right' && <Icon />}
    </Button>
  );
};

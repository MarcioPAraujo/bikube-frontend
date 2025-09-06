import { Icon } from '@/components/Icons/Icons';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
  ErrorMessage,
  EyButton,
  Field,
  Input,
  Label,
} from './passwordInputStyles';

interface IProps {
  id: string;
  labelText: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  fieldClassName?: string;
  onCopy?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}
const PasswordInput: React.FC<IProps> = ({
  id,
  labelText,
  placeholder,
  disabled = false,
  errorMessage,
  fieldClassName,
  register,
  value,
  onCopy,
  onPaste,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Field className={fieldClassName}>
      <Label htmlFor={id}>{labelText}</Label>
      <Input
        type={showPassword ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onCopy={onCopy}
        onPaste={onPaste}
        {...register}
      />
      <EyButton type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword && <Icon name="OpenedEye" />}
        {!showPassword && <Icon name="ClosedEye" />}
      </EyButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Field>
  );
};
export default PasswordInput;

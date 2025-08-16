import { Icons } from '@/components/Icons/Icons';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage, EyButton, Field, Input, Label } from './passwordInputStyles';

interface IProps {
  id: string;
  labelText: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  fieldClassName?: string;
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
        {...register}
      />
      <EyButton type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword && <Icons.OpenedEye />}
        {!showPassword && <Icons.ClosedEye />}
      </EyButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Field>
  );
};
export default PasswordInput;

import IconButton from '@/components/Buttons/IconButton';
import { ErrorMessage, Input, InputContainer, InputWrapper, Label } from './styles';
import { Icons } from '@/components/Icons/Icons';
import { FC, useState } from 'react';

interface IPasswordInputProps {
  id: string;
  labelText: string;
  placeholder: string;
  register?: any;
  errors?: string;
}
const PasswordInput: FC<IPasswordInputProps> = ({ id, labelText, register, errors, placeholder }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  return (
    <InputWrapper>
      <Label htmlFor={id}>{labelText}</Label>
      <InputContainer>
        <Input id={id} type={showNewPassword ? 'text' : 'password'} placeholder={placeholder} {...register} />
        <IconButton
          icon={showNewPassword ? Icons.OpenedEye : Icons.ClosedEye}
          onClick={() => setShowNewPassword(prev => !prev)}
        />
      </InputContainer>
      {errors && <ErrorMessage>{errors}</ErrorMessage>}
    </InputWrapper>
  );
};
export default PasswordInput;

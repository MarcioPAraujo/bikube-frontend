import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import InputAuxTextProps from '../InputAuxText/InputAuxText';
import { FieldContainer, Label, TextareaStyled } from './textareaStyles';

interface TextareaProps {
  id: string;
  placeholder: string;
  label: string;
  value?: string;
  disabled?: boolean;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void | VoidFunction;
}
const Textarea: React.FC<TextareaProps> = ({
  id,
  placeholder,
  label,
  value,
  disabled = false,
  error,
  register,
  onChange,
}) => {
  return (
    <FieldContainer>
      <Label htmlFor={id}>{label}</Label>
      <TextareaStyled
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...register}
        className={error ? 'has-error' : ''}
      />
      <InputAuxTextProps text={error?.message} variant="ERROR-MESSAGE" />
    </FieldContainer>
  );
};
export default Textarea;

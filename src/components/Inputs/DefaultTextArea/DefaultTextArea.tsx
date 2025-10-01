import { UseFormRegisterReturn } from 'react-hook-form';
import InputAuxTextProps from '../InputAuxText/InputAuxText';
import { Field, Label, TextArea } from './styles';

interface DefaultTextAreaProps {
  id: string;
  labelText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register?: UseFormRegisterReturn;
  rows?: number;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
}

const DefaultTextArea: React.FC<DefaultTextAreaProps> = ({
  id,
  labelText,
  placeholder,
  value,
  onChange,
  register,
  rows = 4,
  disabled = false,
  errorMessage,
  className,
}) => {
  return (
    <Field className={`textarea-component ${className}`}>
      {labelText && <Label htmlFor={id}>{labelText}</Label>}
      <TextArea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...register}
        rows={rows}
        disabled={disabled}
        className={errorMessage ? 'error' : ''}
      />
      <InputAuxTextProps text={errorMessage} variant="ERROR-MESSAGE" />
    </Field>
  );
};
export default DefaultTextArea;

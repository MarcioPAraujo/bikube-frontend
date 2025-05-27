import { ErrorMessage, Field, Input, Label } from './styles';

interface IProps {
  id: string;
  labelText: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  errorMessage?: string;
  register?: any;
}
const InputComponent: React.FC<IProps> = ({
  id,
  placeholder,
  labelText,
  value,
  disabled = false,
  errorMessage,
  register,
}) => {
  return (
    <Field>
      <Label htmlFor={id}>{labelText}</Label>
      <Input id={id} type="text" placeholder={placeholder} defaultValue={value} disabled={disabled} {...register} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Field>
  );
};
export default InputComponent;

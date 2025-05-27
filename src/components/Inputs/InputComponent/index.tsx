import { ErrorMessage, Field, Input, Label } from './styles';

interface IProps {
  id: string;
  labelText: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  errorMessage?: string;
  register?: any;
  fieldClassName?: string;
}
const InputComponent: React.FC<IProps> = ({
  id,
  placeholder,
  labelText,
  value,
  disabled = false,
  errorMessage,
  fieldClassName,
  register,
}) => {
  return (
    <Field className={fieldClassName}>
      <Label htmlFor={id}>{labelText}</Label>
      <Input id={id} type="text" placeholder={placeholder} defaultValue={value} disabled={disabled} {...register} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Field>
  );
};
export default InputComponent;

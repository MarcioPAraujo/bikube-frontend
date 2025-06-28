import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage, Field, Input, Label } from './styles';

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
/**
 * This is a reusable input component that can be used in forms.
 * @param id - The id of the input field.
 * @param placeholder - The placeholder text for the input field.
 * @param labelText - The label text for the input field.
 * @param value - The default value of the input field.
 * @param disabled - Whether the input field is disabled or not.
 * @param errorMessage - The error message to be displayed if there is an error.
 * @param fieldClassName - The class name for the field container.
 * @param register - The register function from react-hook-form to connect the input with the form
 *
 */
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

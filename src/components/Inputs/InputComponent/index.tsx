import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage, Field, Input, Label } from './styles';

interface IProps {
  id: string;
  labelText: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCopy?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  classname?: string;
}
/**
 * This is a reusable input component that can be used in forms.
 * @param id - The id of the input field.
 * @param placeholder - The placeholder text for the input field.
 * @param labelText - The label text for the input field.
 * @param value - The value of the input field.
 * @param defaultValue - The default value of the input field.
 * @param disabled - Whether the input field is disabled or not.
 * @param errorMessage - The error message to be displayed if there is an error.
 * @param register - The register function from react-hook-form to connect the input with the form
 * @param onCopy - clipboard copy event function
 * @param onPaste - clipboard paste event funtion
 * @param onChange - change event function
 * @param classname - additional class name for custom styling
 *
 */
const InputComponent: React.FC<IProps> = ({
  id,
  placeholder,
  labelText,
  value,
  defaultValue,
  disabled = false,
  errorMessage,
  register,
  onCopy,
  onPaste,
  onChange,
  classname,
}) => {
  return (
    <Field className={classname}>
      <Label htmlFor={id}>{labelText}</Label>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        {...register}
        onCopy={onCopy}
        onPaste={onPaste}
        onChange={onChange}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Field>
  );
};
export default InputComponent;

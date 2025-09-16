import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Icon } from '@/components/Icons/Icons';
import { theme } from '@/styles/theme';
import { useState } from 'react';
import RenderIf from '@/components/RenderIf/RenderIf';
import { EyButton, Field, Label, Undelined } from './styles';
import InputAuxTextProps from '../InputAuxText/InputAuxText';

interface IProps {
  id: string;
  labelText: string;
  placeholder: string;
  isPassword?: boolean;
  disabled?: boolean;
  value?: string;
  register?: UseFormRegisterReturn;
  errorType?: FieldError;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void | VoidFunction;
  onCopy?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}
/**
 * This is a reusable input component that can be used in forms.
 * @param id - The id of the input field.
 * @param placeholder - The placeholder text for the input field.
 * @param labelText - The label text for the input field.
 * @param value - The default value of the input field.
 * @param disabled - Whether the input field is disabled or not.
 * @param errorTyep - error provided by the reat-hook-form to apply error message and styles
 * @param register - The register function from react-hook-form to connect the input with the form
 * @param onChange - hnalde changes when the input is not registered on react-hook-form
 * @param onCopy - clipboard copy event function
 * @param onPaste - clipboard paste event funtion
 *
 */
const UnderlinedInput: React.FC<IProps> = ({
  id,
  labelText,
  placeholder,
  isPassword = false,
  disabled = false,
  errorType,
  register,
  value,
  onChange,
  onCopy,
  onPaste,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Field className={isPassword ? 'PASSWORD' : ''}>
      <Label htmlFor={id}>{labelText}</Label>
      <Undelined
        id={id}
        placeholder={placeholder}
        type={!isPassword ? 'text' : showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        onCopy={onCopy}
        disabled={disabled}
        {...register}
        className={errorType ? 'has-error' : ''}
      />
      <RenderIf isTrue={isPassword}>
        <EyButton type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword && <Icon name="OpenedEye" />}
          {!showPassword && <Icon name="ClosedEye" />}
        </EyButton>
      </RenderIf>
      {errorType?.type === 'required' && !isPassword && (
        <Icon
          name="BsExclamationOctagonFill"
          color={theme.colors.RED.hex_EB5757}
          size={20}
          className="error-icon"
        />
      )}
      <InputAuxTextProps text={errorType?.message} variant="ERROR-MESSAGE" />
    </Field>
  );
};
export default UnderlinedInput;

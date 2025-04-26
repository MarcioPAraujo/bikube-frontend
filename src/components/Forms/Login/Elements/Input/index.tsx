import { ErrorMessage, Input, InputWrapper, Label } from './styles';

type LoginInputProps = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value?: string;
  register?: any;
  errors?: any;
};
export function LoginInput(props: LoginInputProps) {
  const { label, id, type, placeholder, value, register, errors } = props;
  return (
    <InputWrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        {...register}
      />
      {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
    </InputWrapper>
  );
}

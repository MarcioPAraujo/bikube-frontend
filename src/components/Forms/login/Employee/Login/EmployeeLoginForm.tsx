import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema, ILoginSchema } from '@/validation/Login/LoginSchema';
import InputComponent from '@/components/Inputs/InputComponent';
import { CustomLink, Form, SubmitButton, Title } from './employeeLoginFormStyles';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput';
import { registerMask } from '@/utils/masks/registerMask';

const EmployeeLoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ILoginSchema>({
    resolver: yupResolver(LoginSchema),
    mode: 'onTouched',
  });

  const onRegisterFieldChange = (value: string) => {
    const formattedRegister = registerMask(value);
    setValue('register', formattedRegister);
  };

  const onFormSubmit = (data: ILoginSchema) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Login</Title>
      <InputComponent
        id="register"
        labelText="Registro do colaborador"
        placeholder="EX: AAAAAA00"
        register={register('register', {
          onChange: e => onRegisterFieldChange(e.target.value),
        })}
        errorMessage={errors.register?.message}
      />
      <PasswordInput
        id="password"
        labelText="Senha"
        placeholder="Insira sua senha"
        register={register('password')}
        errorMessage={errors.password?.message}
      />
      <CustomLink href="/email">Esqueci a senha</CustomLink>
      <SubmitButton type="submit" disabled={isSubmitting || !isValid}>
        Entrar
      </SubmitButton>
    </Form>
  );
};
export default EmployeeLoginForm;

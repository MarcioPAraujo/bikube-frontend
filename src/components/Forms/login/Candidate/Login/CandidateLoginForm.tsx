import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CandidateLoginSchema, CandidateLoginSchemaType } from '@/validation/Login/CandidateLoginSchema';
import InputComponent from '@/components/Inputs/InputComponent';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput';
import { CustomLink, Form, SubmitButton, Title } from '../styles';
import { emailMask } from '@/utils/masks/emailMask';

const CandidateLoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CandidateLoginSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(CandidateLoginSchema),
  });

  const onEmailChange = (value: string) => {
    const formattedEmail = emailMask(value);
    setValue('email', formattedEmail);
  };

  const onFormSubmit = (data: CandidateLoginSchemaType) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Login</Title>
      <InputComponent
        id="email"
        labelText="Email"
        placeholder="Insira seu email"
        register={register('email', {
          onChange: e => onEmailChange(e.target.value),
        })}
        errorMessage={errors.email?.message}
      />
      <PasswordInput
        id="password"
        labelText="Senha"
        placeholder="Insira sua senha"
        register={register('password')}
        errorMessage={errors.password?.message}
      />
      <CustomLink href="/candidato-email">Esqueci a senha</CustomLink>
      <CustomLink href="/candidato-registro">Primeiro acesso</CustomLink>
      <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
        Entrar
      </SubmitButton>
    </Form>
  );
};
export default CandidateLoginForm;

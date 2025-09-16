import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import LoadingScreen from '@/components/LoadingScreen';
import FormTitle from '../FormTitle/FormTitle';
import { Content, Form } from './styles';
import useAccessCredentialsForm from './useAccessCredentialsForm';

const AccessCredentialsForm: React.FC = () => {
  const {
    hookform: { errors, handleSubmit, isSubmitting, register },
    back,
    onFormSubmit,
  } = useAccessCredentialsForm();

  return (
    <>
      {isSubmitting && (
        <LoadingScreen message="Emviando codígo de confirmação para o email informado..." />
      )}

      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <FormTitle
          onBack={back}
          title="Credenciais de acesso"
          isNextDisabled={isSubmitting}
        />
        <Content>
          <UnderlinedInput
            id="email"
            labelText="Email"
            placeholder="Insira seu email"
            register={register('email')}
            errorType={errors.email}
          />
          <UnderlinedInput
            id="password"
            labelText="Senha"
            placeholder="Insira sua senha"
            isPassword
            errorType={errors.password}
            register={register('password')}
          />
          <UnderlinedInput
            id="confirm-password"
            labelText="Confirmar senha"
            placeholder="Digite a senha novamente"
            isPassword
            register={register('confirmPassword')}
            errorType={errors.confirmPassword}
          />
        </Content>
      </Form>
    </>
  );
};
export default AccessCredentialsForm;

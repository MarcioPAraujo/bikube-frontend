import FormTitle from '../FormTitle/FormTitle';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import { Content, Form } from './accessCredentialsFormStyles';
import { emailMask } from '@/utils/masks/emailMask';
import useAccessCredentialsForm from './useAccessCredentialsForm';

const AccessCredentialsForm: React.FC = () => {
  const {
    hookform: { errors, handleSubmit, isSubmitting, register },
    back,
    handleFieldChange,
    onFormSubmit,
  } = useAccessCredentialsForm();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormTitle onBack={back} title="Credenciais de acesso" isNextDisabled={isSubmitting} />
      <Content>
        <UnderlinedInput
          id="email"
          labelText="Email"
          placeholder="Insira seu email"
          register={register('email', {
            onChange: e => handleFieldChange('email', emailMask(e.target.value)),
          })}
          errorType={errors.email}
        />
        <UnderlinedInput
          id="password"
          labelText="Senha"
          placeholder="Insira sua senha"
          isPassword
          errorType={errors.password}
          register={register('password', {
            onChange: e => handleFieldChange('password', e.target.value),
          })}
        />
        <UnderlinedInput
          id="confirm-password"
          labelText="Confirmar senha"
          placeholder="Digite a senha novamente"
          isPassword
          register={register('confirmPassword', {
            onChange: e => handleFieldChange('confirmPassword', e.target.value),
          })}
          errorType={errors.confirmPassword}
        />
      </Content>
    </Form>
  );
};
export default AccessCredentialsForm;

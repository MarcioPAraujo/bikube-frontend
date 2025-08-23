import InputComponent from '@/components/Inputs/InputComponent';
import { Description, Form, SubmitButton, Title } from '../commonStyles';
import useEmailVerificationForm from './useEmailVerificationForm';

const EmailVerificationForm: React.FC = () => {
  const {
    hookform: { errors, isSubmitting, isValid, handleSubmit, register },
    onEmailChange,
    onFormSubmit,
  } = useEmailVerificationForm();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Email</Title>
      <Description>Insira seu email informado na contratação, você receberá o código de confirmação</Description>
      <InputComponent
        id="email"
        labelText="Email"
        placeholder="Insira seu email"
        register={register('email', {
          onChange: e => onEmailChange(e.target.value),
        })}
        errorMessage={errors.email?.message}
      />
      <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
        Enviar
      </SubmitButton>
    </Form>
  );
};
export default EmailVerificationForm;

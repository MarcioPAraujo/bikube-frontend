import InputComponent from '@/components/Inputs/InputComponent';
import { Description, Form, SubmitButton, Title } from '../styles';
import useCandidateEmailVerificationForm from './useCandidateEmailVerificationForm';

const CandidateEmailVerificationForm: React.FC = () => {
  const {
    hookform: { errors, isValid, isSubmitting, register, handleSubmit },
    onEmailChange,
    onFormSubmit,
  } = useCandidateEmailVerificationForm();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Email</Title>
      <Description>
        Insira o email usado no seu cadastro para dar seguimento a redefinição
        de senha
      </Description>
      <InputComponent
        id="email"
        labelText="Email"
        placeholder="insira seu email"
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
export default CandidateEmailVerificationForm;

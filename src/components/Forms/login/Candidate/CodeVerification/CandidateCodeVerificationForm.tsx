import InputComponent from '@/components/Inputs/InputComponent';
import { CodeResntButton, Description, Form, SubmitButton, Title } from '../styles';
import useCandidateCodeVerificationForm from './useCandidateCodeVerificationForm';

const CandidateCodeVerificationForm: React.FC = () => {
  const {
    hookform: { errors, handleSubmit, isSubmitting, isValid, register },
    canResendCode,
    onCodeChange,
    onFormSubmit,
    resendCode,
    resetTime,
  } = useCandidateCodeVerificationForm();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Código de verificação</Title>
      <Description>Insira o código recebido no seu email</Description>
      <InputComponent
        id="code"
        labelText="Código"
        placeholder="EX: 0000"
        register={register('code', {
          onChange: e => onCodeChange(e.target.value),
        })}
        errorMessage={errors.code?.message}
      />
      <CodeResntButton type="button" disabled={!canResendCode} onClick={resendCode}>
        {canResendCode && 'Reenviar o código'}
        {!canResendCode && `Reenviar o código em: ${resetTime}`}
      </CodeResntButton>
      <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
        Verificar
      </SubmitButton>
    </Form>
  );
};
export default CandidateCodeVerificationForm;

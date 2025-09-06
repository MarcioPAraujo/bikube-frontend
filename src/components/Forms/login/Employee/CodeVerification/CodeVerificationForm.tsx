import InputComponent from '@/components/Inputs/InputComponent';
import {
  CodeResntButton,
  Description,
  Form,
  SubmitButton,
  Title,
} from '../commonStyles';
import useCodeVerificationForm from './useCodeVerificationForm';

const CodeVerficationForm: React.FC = () => {
  const {
    hookform: { errors, isSubmitting, isValid, handleSubmit, register },
    canResendCode,
    resetTime,
    onCodeChange,
    onFormSubmit,
    resendCode,
  } = useCodeVerificationForm();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Código de verificação</Title>
      <Description>
        Insira aqui o código que você recebeu no seu email informado na etapa
        anterior
      </Description>
      <InputComponent
        id="code"
        labelText="Código"
        placeholder="EX: 0000"
        register={register('code', {
          onChange: e => onCodeChange(e.target.value),
        })}
        errorMessage={errors.code?.message}
      />
      <CodeResntButton
        type="button"
        disabled={!canResendCode}
        onClick={resendCode}
      >
        {canResendCode && 'Reenviar o código'}
        {!canResendCode && `Reenviar o código em: ${resetTime}`}
      </CodeResntButton>
      <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
        Verificar
      </SubmitButton>
    </Form>
  );
};
export default CodeVerficationForm;

import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import useSendCodeTimer from '@/hooks/useSendCodeTimer';
import FormTitle from '../FormTitle/FormTitle';
import {
  Content,
  Description,
  Form,
  ResedCodeButton,
} from './emailVerificationFormStyles';
import useEmailVerificationForm from './useEmailVerificationForm';

const EmailVerificationForm: React.FC = () => {
  const {
    back,
    handleChange,
    onFormSubmit,
    hookform: { errors, handleSubmit, isSubmitting, register },
  } = useEmailVerificationForm();
  const { canResendCode, resendCode, resetTime } = useSendCodeTimer();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormTitle
        title="Verificação de email"
        onBack={back}
        isNextDisabled={isSubmitting}
      />
      <Description>
        Insira o códgio recebido no email informado na etapa anterior
      </Description>
      <Content>
        <UnderlinedInput
          id="code"
          labelText="Código"
          placeholder="EX:0000"
          register={register('code', {
            onChange: e => handleChange(e.target.value),
          })}
          errorType={errors.code}
        />
        <ResedCodeButton
          type="button"
          disabled={!canResendCode}
          onClick={resendCode}
        >
          {canResendCode
            ? 'Reenviar código'
            : `Reenviar código em: ${resetTime}`}
        </ResedCodeButton>
      </Content>
    </Form>
  );
};
export default EmailVerificationForm;

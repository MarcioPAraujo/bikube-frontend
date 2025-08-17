import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CodeSchema, CodeSchemaType } from '@/validation/Login/CodeSchema';
import InputComponent from '@/components/Inputs/InputComponent';
import { CodeResntButton, Description, Form, SubmitButton, Title } from '../commonStyles';
import codeMask from '@/utils/masks/codeMask';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RESEND_TIMEOUT = 60;

const CodeVerficationForm: React.FC = () => {
  const router = useRouter();
  const [canResendCode, setCanResendCode] = useState<boolean>(true);
  const [resetTime, setResetTime] = useState<number>(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CodeSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(CodeSchema),
  });

  // timer to display how mauch seocnds remain to resend the code
  useEffect(() => {
    if (resetTime === 0) return;
    const interval = setInterval(() => {
      let newTime = 0;
      if (resetTime <= 0) {
        setCanResendCode(true);
        clearInterval(interval);
      } else {
        newTime = resetTime - 1;
      }
      setResetTime(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [resetTime]);

  const onFormSubmit = (data: CodeSchemaType) => {
    console.log(data);
    router.push('/redefinir-senha');
  };

  const onCodeChange = (codeValue: string) => {
    const formattedCode = codeMask(codeValue);
    setValue('code', formattedCode);
  };

  const resendCode = () => {
    console.log('code resent');
    setCanResendCode(false);

    const oneMinute = 1000 * RESEND_TIMEOUT;
    setResetTime(RESEND_TIMEOUT);

    setTimeout(() => {
      setCanResendCode(true);
    }, oneMinute);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Código de verificação</Title>
      <Description>Insira aqui o código que você recebeu no seu email informado na etapa anterior</Description>
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
export default CodeVerficationForm;

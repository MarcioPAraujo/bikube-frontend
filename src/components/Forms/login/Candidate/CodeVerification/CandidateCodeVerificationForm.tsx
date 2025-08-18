import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CodeSchema, CodeSchemaType } from '@/validation/Login/CodeSchema';
import InputComponent from '@/components/Inputs/InputComponent';
import { CodeResntButton, Description, Form, SubmitButton, Title } from '../styles';
import codeMask from '@/utils/masks/codeMask';
import { useEffect, useState } from 'react';
import { notifySuccess } from '@/utils/handleToast';
import { useRouter } from 'next/navigation';

const RESEND_TIMEOUT = 60;

const CandidateCodeVerificationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CodeSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(CodeSchema),
  });
  const router = useRouter();
  const [canResendCode, setCanResendCode] = useState<boolean>(true);
  const [resetTime, setResetTime] = useState<number>(0);

  const startCountdown = (time: number) => {
    setResetTime(time);
    setCanResendCode(false);

    const tick = (remaining: number) => {
      if (remaining > 0) {
        setTimeout(() => {
          setResetTime(remaining - 1);
          tick(remaining - 1);
        }, 1000);
      } else {
        setCanResendCode(true);
      }
    };

    tick(time);
  };
  const resendCode = () => {
    console.log('code resent');
    notifySuccess('Um novo código foi enviado ao seu email!');
    startCountdown(RESEND_TIMEOUT);
  };

  const onFormSubmit = (data: CodeSchemaType) => {
    console.log(data);
    router.push('/candidato-redefinir-senha');
  };

  const onCodeChange = (value: string) => {
    const formattedCode = codeMask(value);
    setValue('code', formattedCode);
  };

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

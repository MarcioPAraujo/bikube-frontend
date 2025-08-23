import { notifySuccess } from '@/utils/handleToast';
import codeMask from '@/utils/masks/codeMask';
import { CodeSchema, CodeSchemaType } from '@/validation/Login/CodeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const RESEND_TIMEOUT = 60;

const useCandidateCodeVerificationForm = () => {
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

  const hookform = {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
  };

  return {
    hookform,
    canResendCode,
    resetTime,
    resendCode,
    onCodeChange,
    onFormSubmit,
  };
};
export default useCandidateCodeVerificationForm;

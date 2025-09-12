import { sendCode } from '@/services/login/sentCodeService';
import { validateCode } from '@/services/login/validateCodeService';
import { notifyError, notifySuccess } from '@/utils/handleToast';
import codeMask from '@/utils/masks/codeMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { CodeSchema, CodeSchemaType } from '@/validation/Login/CodeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const RESEND_TIMEOUT = 60;

const useCodeVerificationForm = () => {
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

  const onFormSubmit = async (data: CodeSchemaType) => {
    const result = await validateCode(data.code);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    router.push('/redefinir-senha');
  };

  const onCodeChange = (codeValue: string) => {
    const formattedCode = codeMask(codeValue);
    setValue('code', formattedCode);
  };

  const resendCode = async () => {
    const email = sessionStorage.getItem(SESSION_STORAGE_KEYS.email);
    if (!email) {
      notifyError('No foi possível reenviar o código. Tente novamente.');
      return;
    }
    const result = await sendCode(email);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    setCanResendCode(false);

    const oneMinute = 1000 * RESEND_TIMEOUT;
    setResetTime(RESEND_TIMEOUT);

    notifySuccess('Um novo código foi enviado ao seu email!');

    setTimeout(() => {
      setCanResendCode(true);
    }, oneMinute);
  };

  const hookform = {
    register,
    handleSubmit,
    isSubmitting,
    isValid,
    errors,
  };

  return {
    hookform,
    canResendCode,
    resetTime,
    resendCode,
    onFormSubmit,
    onCodeChange,
  };
};
export default useCodeVerificationForm;

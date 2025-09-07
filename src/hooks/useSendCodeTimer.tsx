import { sendCodeToEmail } from '@/services/email/emailService';
import { notifyError, notifySuccess } from '@/utils/handleToast';
import { useState } from 'react';

const RESEND_TIMEOUT = 60;

const useSendCodeTimer = () => {
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
  const resendCode = async (email: string) => {
    if (!canResendCode) return;

    const result = await sendCodeToEmail(email);
    if (result.error) {
      notifyError(result.error);
      return;
    }

    notifySuccess('Um novo código foi enviado ao seu email!');
    startCountdown(RESEND_TIMEOUT);
  };

  return {
    resendCode,
    canResendCode,
    resetTime,
  };
};
export default useSendCodeTimer;

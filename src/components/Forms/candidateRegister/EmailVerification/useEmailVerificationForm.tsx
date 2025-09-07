import useSendCodeTimer from '@/hooks/useSendCodeTimer';
import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { verifyEmailCode } from '@/services/email/emailService';
import { notifyError } from '@/utils/handleToast';
import codeMask from '@/utils/masks/codeMask';
import { CodeSchema, CodeSchemaType } from '@/validation/Login/CodeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const useEmailVerificationForm = () => {
  const { step1, step2 } = useStepsRegistration();
  const { canResendCode, resendCode, resetTime } = useSendCodeTimer();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<CodeSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(CodeSchema),
  });

  const handleChange = (value: string) => {
    const formattedValue = codeMask(value);
    setValue('code', formattedValue);
  };

  const onFormSubmit = async (data: CodeSchemaType) => {
    const email = step1.formData?.email;
    if (!email) return;

    const result = await verifyEmailCode(email, data.code);
    if (result.error) {
      notifyError(result.error);
      return;
    }

    router.push(step2.pathname);
  };

  const back = () => {
    router.push(step1.pathname);
  };

  const hookform = {
    register,
    handleSubmit,
    isSubmitting,
    errors,
  };

  const refreshCode = () => {
    const email = step1.formData?.email;
    if (!email) return;
    resendCode(email);
  };

  return {
    hookform,
    onFormSubmit,
    handleChange,
    back,
    canResendCode,
    resendCode: refreshCode,
    resetTime,
  };
};
export default useEmailVerificationForm;

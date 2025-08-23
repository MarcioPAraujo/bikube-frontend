import { emailMask } from '@/utils/masks/emailMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { SendCodeSchema, SendCodeSchemaType } from '@/validation/Login/SendCodeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const useEmailVerificationForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SendCodeSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(SendCodeSchema),
  });

  const onFormSubmit = (data: SendCodeSchemaType) => {
    // here it stores the email to reuse on code verification, for code resent, and on the reset password on the body of the request
    sessionStorage.setItem(SESSION_STORAGE_KEYS.email, data.email);
    console.log(data);
    router.push('/codigo');
  };

  const onEmailChange = (value: string) => {
    const formattedEmailValue = emailMask(value);
    setValue('email', formattedEmailValue);
  };

  const hookform = {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    isValid,
  };

  return {
    hookform,
    onEmailChange,
    onFormSubmit,
  };
};
export default useEmailVerificationForm;

import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from '@/validation/Login/ResetPasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useResetPasswordForm = () => {
  const router = useRouter();
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onFormSubmit = (data: ResetPasswordSchemaType) => {
    console.log(data);
    // router.push('/');
    setSuccessModal(true);
  };

  const backToLogin = () => {
    router.push('/');
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
    onFormSubmit,
    backToLogin,
    successModal,
  };
};
export default useResetPasswordForm;

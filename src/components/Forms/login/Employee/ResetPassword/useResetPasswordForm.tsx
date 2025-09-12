import { resetPassword } from '@/services/login/passwordResetService';
import { notifyError } from '@/utils/handleToast';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
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

  const onFormSubmit = async (data: ResetPasswordSchemaType) => {
    const email = sessionStorage.getItem(SESSION_STORAGE_KEYS.email);
    if (!email) return;
    const resutl = await resetPassword({
      senha: data.newPassword,
      email,
    });

    if (resutl.error) {
      notifyError(resutl.error);
      return;
    }

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

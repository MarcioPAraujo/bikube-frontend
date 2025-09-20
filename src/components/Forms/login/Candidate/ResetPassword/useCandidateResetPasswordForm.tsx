import { resetCandidatePassword } from '@/services/login/passwordResetService';
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

const useCandidateResetPasswordForm = () => {
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
    const result = await resetCandidatePassword({
      novasenha: data.newPassword,
    });

    if (result.error) {
      notifyError(result.error);
      return;
    }

    sessionStorage.removeItem(SESSION_STORAGE_KEYS.email);
    setSuccessModal(true);
  };

  const backToLogin = () => {
    router.push('/candidato-login');
  };

  const hookform = {
    isSubmitting,
    isValid,
    register,
    handleSubmit,
    errors,
  };

  return {
    hookform,
    successModal,
    onFormSubmit,
    backToLogin,
  };
};
export default useCandidateResetPasswordForm;

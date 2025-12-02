import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { sendCodeToEmail } from '@/services/email/emailService';
import { decryptPassword, encryptPassword } from '@/utils/encryptPassword';
import { notifyError } from '@/utils/handleToast';
import { emailMask } from '@/utils/masks/emailMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import {
  CredentialsSchema,
  CredentialsSchemaType,
} from '@/validation/candidateRegister/CredentialSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const useAccessCredentialsForm = () => {
  const { setCurrentStep, setStep1, step1 } = useStepsRegistration();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CredentialsSchemaType>({
    resolver: yupResolver(CredentialsSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    setCurrentStep(1);

    const retrieveData = async () => {
      let data = step1.formData;
      if (!data) {
        const storedData = sessionStorage.getItem(SESSION_STORAGE_KEYS.step1);
        data = storedData ? JSON.parse(storedData) : null;
        if (!data) return;
      }

      const decryptedPassword = await decryptPassword(data.password);
      data.password = decryptedPassword;
      data.confirmPassword = decryptedPassword;

      setValue('email', data.email);
      setValue('confirmPassword', data.confirmPassword);
      setValue('password', data.password);

      setStep1(prev => ({
        ...prev,
        formData: data,
      }));
    };
    retrieveData();
  }, []);

  const onEmailChange = (value: string) => {
    const formattedEmail = emailMask(value);
    setValue('email', formattedEmail);
  };

  const onFormSubmit = async (data: CredentialsSchemaType) => {
    const result = await sendCodeToEmail(data.email);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    const encriptedPassword = await encryptPassword(data.password);

    data = {
      ...data,
      password: encriptedPassword,
      confirmPassword: encriptedPassword,
    };

    setStep1(prev => ({
      ...prev,
      formData: data,
    }));
    sessionStorage.setItem(SESSION_STORAGE_KEYS.step1, JSON.stringify(data));
    router.push('/candidato-registro/credenciais-de-acesso/verificar-email');
  };

  const back = () => {
    router.push('/candidato-login');
  };

  const hookform = {
    register,
    handleSubmit,
    isSubmitting,
    errors,
  };

  return {
    hookform,
    onFormSubmit,
    onEmailChange,
    back,
  };
};
export default useAccessCredentialsForm;

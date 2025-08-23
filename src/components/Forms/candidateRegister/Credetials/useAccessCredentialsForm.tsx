import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { CredentialsSchema, CredentialsSchemaType } from '@/validation/candidateRegister/CredentialSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const useAccessCredentialsForm = () => {
  const { setCurrentStep, setStep1, step1, step2 } = useStepsRegistration();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CredentialsSchemaType>({
    resolver: yupResolver(CredentialsSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    setCurrentStep(1);
    let data = step1.formData;
    if (!data) {
      const storedData = sessionStorage.getItem(SESSION_STORAGE_KEYS.step1);
      data = storedData ? JSON.parse(storedData) : null;
      if (!data) return;
    }
    setValue('email', data.email);
    setValue('confirmPassword', data.confirmPassword);
    setValue('password', data.password);

    setStep1(prev => ({
      ...prev,
      formData: data,
    }));
  }, []);

  const handleFieldChange = (field: keyof CredentialsSchemaType, value: string) => {
    const newData = getValues();
    const updatedData = { ...newData, [field]: value };
    setValue(field, value);
    setStep1(prev => ({
      ...prev,
      formData: updatedData,
    }));
    sessionStorage.setItem(SESSION_STORAGE_KEYS.step1, JSON.stringify(updatedData));
  };

  const onFormSubmit = (data: CredentialsSchemaType) => {
    console.log(data);
    setStep1(prev => ({
      ...prev,
      formData: data,
    }));
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
    handleFieldChange,
    back,
  };
};
export default useAccessCredentialsForm;

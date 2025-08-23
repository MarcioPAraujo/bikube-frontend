import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CredentialsSchema, CredentialsSchemaType } from '@/validation/candidateRegister/CredentialSchema';
import { useRouter } from 'next/navigation';
import FormTitle from '../FormTitle/FormTitle';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import { Content, Form } from './accessCredentialsFormStyles';
import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { useEffect } from 'react';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { emailMask } from '@/utils/masks/emailMask';

const AccessCredentialsForm: React.FC = () => {
  const { setCurrentStep, setStep1, step1, step2 } = useStepsRegistration();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
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
    router.push(step2.pathname);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormTitle onBack={() => router.push('/candidato-login')} title="Credenciais de acesso" />
      <Content>
        <UnderlinedInput
          id="email"
          labelText="Email"
          placeholder="Insira seu email"
          register={register('email', {
            onChange: e => handleFieldChange('email', emailMask(e.target.value)),
          })}
          errorType={errors.email}
        />
        <UnderlinedInput
          id="password"
          labelText="Senha"
          placeholder="Insira sua senha"
          isPassword
          errorType={errors.password}
          register={register('password', {
            onChange: e => handleFieldChange('password', e.target.value),
          })}
        />
        <UnderlinedInput
          id="confirm-password"
          labelText="Confirmar senha"
          placeholder="Digite a senha novamente"
          isPassword
          register={register('confirmPassword', {
            onChange: e => handleFieldChange('confirmPassword', e.target.value),
          })}
          errorType={errors.confirmPassword}
        />
      </Content>
    </Form>
  );
};
export default AccessCredentialsForm;

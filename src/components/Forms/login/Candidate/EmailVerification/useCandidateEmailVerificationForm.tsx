import { emailMask } from '@/utils/masks/emailMask';
import { SendCodeSchema, SendCodeSchemaType } from '@/validation/Login/SendCodeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const useCandidateEmailVerificationForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SendCodeSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(SendCodeSchema),
  });

  const onFormSubmit = (data: SendCodeSchemaType) => {
    console.log(data);
    router.push('/candidato-codigo');
  };

  const onEmailChange = (value: string) => {
    const formattedEmail = emailMask(value);
    setValue('email', formattedEmail);
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
    onEmailChange,
    onFormSubmit,
  };
};
export default useCandidateEmailVerificationForm;

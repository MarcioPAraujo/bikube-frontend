import { emailMask } from '@/utils/masks/emailMask';
import { CandidateLoginSchema, CandidateLoginSchemaType } from '@/validation/Login/CandidateLoginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const useCandidateLoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CandidateLoginSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(CandidateLoginSchema),
  });

  const onEmailChange = (value: string) => {
    const formattedEmail = emailMask(value);
    setValue('email', formattedEmail);
  };

  const onFormSubmit = (data: CandidateLoginSchemaType) => {
    console.log(data);
  };

  const hookform = {
    register,
    handleSubmit,
    isSubmitting,
    isValid,
    errors,
  };

  return {
    hookform,
    onFormSubmit,
    onEmailChange,
  };
};
export default useCandidateLoginForm;

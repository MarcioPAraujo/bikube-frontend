import { candidateLogin } from '@/services/login/candidateLogin';
import { notifyError } from '@/utils/handleToast';
import { emailMask } from '@/utils/masks/emailMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
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
    resolver: yupResolver(CandidateLoginSchema),
    mode: 'onTouched',
  });

  const onEmailChange = (value: string) => {
    const formattedEmail = emailMask(value);
    setValue('email', formattedEmail);
  };

  const onFormSubmit = async (data: CandidateLoginSchemaType) => {
    const result = await candidateLogin({ email: data.email, password: data.password });
    if (result.error) {
      notifyError(result.error);
      return;
    }
    if (result.data) {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.token, JSON.stringify(result.data.access_token));
    }
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

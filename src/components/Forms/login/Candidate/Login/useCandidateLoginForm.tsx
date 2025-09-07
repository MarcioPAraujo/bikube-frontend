import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { candidateLogin } from '@/services/login/candidateLogin';
import { notifyError } from '@/utils/handleToast';
import { emailMask } from '@/utils/masks/emailMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import {
  CandidateLoginSchema,
  CandidateLoginSchemaType,
} from '@/validation/Login/CandidateLoginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const useCandidateLoginForm = () => {
  const { setCandidate } = useCandidateAuth();
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
    const result = await candidateLogin({
      email: data.email,
      password: data.password,
    });
    if (result.error) {
      notifyError(result.error);
      return;
    }
    if (result.data) {
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.user,
        JSON.stringify({ id: result.data.id }),
      );
      setCandidate({ id: result.data.id });
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

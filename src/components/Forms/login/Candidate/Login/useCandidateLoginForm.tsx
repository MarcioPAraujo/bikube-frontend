import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { candidateLogin } from '@/services/login/candidateLogin';
import { candidateAcceptTerms } from '@/services/termsOfUse/termsofUseService';
import { notifyError } from '@/utils/handleToast';
import { emailMask } from '@/utils/masks/emailMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import {
  CandidateLoginSchema,
  CandidateLoginSchemaType,
} from '@/validation/Login/CandidateLoginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [candidateId, setCandidateId] = useState<number | null>(null);

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
      if (result.data.termo !== 'true') {
        setCandidateId(Number(result.data.id));
        setTermsAccepted(true);
        return;
      }
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.candidate,
        JSON.stringify({ id: result.data.id }),
      );
      setCandidate({ id: result.data.id });
    }
  };

  const onAcceptterms = async () => {
    const result = await candidateAcceptTerms(candidateId as number);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    setTermsAccepted(false);
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
    termsAccepted,
    setTermsAccepted,
    onAcceptterms,
  };
};
export default useCandidateLoginForm;

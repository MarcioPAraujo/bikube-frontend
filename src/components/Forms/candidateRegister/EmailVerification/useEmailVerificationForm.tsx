import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import codeMask from '@/utils/masks/codeMask';
import { CodeSchema, CodeSchemaType } from '@/validation/Login/CodeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const useEmailVerificationForm = () => {
  const { step1, step2 } = useStepsRegistration();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<CodeSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(CodeSchema),
  });

  const handleChange = (value: string) => {
    const formattedValue = codeMask(value);
    setValue('code', formattedValue);
  };

  const onFormSubmit = (data: CodeSchemaType) => {
    console.log(data);
    router.push(step2.pathname);
  };

  const back = () => {
    router.push(step1.pathname);
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
    handleChange,
    back,
  };
};
export default useEmailVerificationForm;

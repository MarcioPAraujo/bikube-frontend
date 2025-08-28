import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SkillsSchema, SkillsSchemaType } from '@/validation/candidateRegister/SkillSchema';
import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { useRouter } from 'next/navigation';
import FormTitle from '../FormTitle/FormTitle';

const SkillsForm = () => {
  const router = useRouter();
  const { setCurrentStep, step4, setStep5, step5 } = useStepsRegistration();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SkillsSchemaType>({
    resolver: yupResolver(SkillsSchema),
    defaultValues: {
      skills: [{ competency: '', periodInMonths: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
    rules: { minLength: 1, maxLength: 10 },
  });

  return (
    <form>
      <FormTitle onBack={() => router.push(step4.pathname)} title="habilidades e competências" />
    </form>
  );
};
export default SkillsForm;

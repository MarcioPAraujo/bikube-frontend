import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { notifyError } from '@/utils/handleToast';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { SkillsSchema, SkillsSchemaType } from '@/validation/candidateRegister/SkillSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const useSkillsForm = () => {
  const router = useRouter();
  const { setCurrentStep, step4, setStep5, step5 } = useStepsRegistration();
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SkillsSchemaType>({
    resolver: yupResolver(SkillsSchema),
    defaultValues: {
      skills: [{ competency: '', periodInMonths: '' }],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'skills',
    rules: { minLength: 1, maxLength: 10 },
  });

  useEffect(() => {
    setCurrentStep(5);
    let data = step5.formData;
    if (!data) {
      const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEYS.step5);
      data = sessionData ? JSON.parse(sessionData) : null;
      if (!data) return;
    }

    if (data.skills && data.skills.length) {
      replace(data.skills);
    }
  }, []);

  const storeValues = (data: SkillsSchemaType) => {
    setStep5(prev => ({ ...prev, formData: data }));
    sessionStorage.setItem(SESSION_STORAGE_KEYS.step5, JSON.stringify(data));
  };

  const onRemove = (index: number) => {
    if (fields.length === 1) return;
    const currentValues = getValues();
    const newValues = currentValues.skills.filter((_, i) => i !== index);
    storeValues({ skills: newValues });
    remove(index);
  };

  const storeOnChange = (value: string, index: number, field: 'competency' | 'periodInMonths') => {
    const currentValues = getValues();
    const newValues = currentValues.skills.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill));
    storeValues({ skills: newValues });
  };

  const onSubmit = (data: SkillsSchemaType) => {
    const hasDuplicates = data.skills.some(
      (skill, index) => data.skills.findIndex(s => s.competency === skill.competency) !== index,
    );
    if (hasDuplicates) {
      notifyError('Habilidades duplicadas não são permitidas.');
      return;
    }
    setSuccessModalOpen(true);
  };

  const back = () => {
    router.push(step4.pathname);
  };

  const hookform = {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    control,
  };

  return {
    hookform,
    fields,
    append,
    onSubmit,
    storeOnChange,
    onRemove,
    successModalOpen,
    setSuccessModalOpen,
    back,
  };
};
export default useSkillsForm;

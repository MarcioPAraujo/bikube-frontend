import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { IOption } from '@/interfaces/option';
import { registerNewCandidate } from '@/services/candidate/candidateService';
import { getSkills } from '@/services/skilss/skilssService';
import { notifyError } from '@/utils/handleToast';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { SkillsSchema, SkillsSchemaType } from '@/validation/candidateRegister/SkillSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const useSkillsForm = () => {
  const router = useRouter();
  const { setCurrentStep, setStep5, step5, step4, step3, step2, step1 } = useStepsRegistration();
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
  const [skillsOptions, setSkillsOptions] = useState<IOption[]>([]);

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
    const retrieveSkills = async () => {
      const result = await getSkills();
      if (result.error) {
        notifyError(result.error);
        return;
      }
      if (result.data) {
        const options = result.data.map(skill => ({
          label: skill.habilidade,
          value: skill.habilidade,
        }));
        setSkillsOptions(options);
      }
    };
    retrieveSkills();

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

  const onSubmit = async (data: SkillsSchemaType) => {
    const hasDuplicates = data.skills.some(
      (skill, index) => data.skills.findIndex(s => s.competency === skill.competency) !== index,
    );
    if (hasDuplicates) {
      notifyError('Habilidades duplicadas não são permitidas.');
      return;
    }

    const result = await registerNewCandidate({
      step1: step1.formData!,
      step2: step2.formData!,
      step3: step3.formData!,
      step4: step4.formData!,
      step5: data,
    });
    if (result.error) {
      notifyError(result.error);
      return;
    }

    setSuccessModalOpen(true);
  };

  const back = () => {
    router.push(step4.pathname);
  };

  const onPeriodChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value === '') {
      setValue(`skills.${index}.periodInMonths`, '0');
      storeOnChange('0', index, 'periodInMonths');
      return;
    }
    const filteredNumber = Math.min(Number(value), 360).toString();
    setValue(`skills.${index}.periodInMonths`, filteredNumber);
    storeOnChange(filteredNumber, index, 'periodInMonths');
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
    skillsOptions,
    fields,
    append,
    onSubmit,
    storeOnChange,
    onRemove,
    successModalOpen,
    setSuccessModalOpen,
    back,
    onPeriodChange,
  };
};
export default useSkillsForm;

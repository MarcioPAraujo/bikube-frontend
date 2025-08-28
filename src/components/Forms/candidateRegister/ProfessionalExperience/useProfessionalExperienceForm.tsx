import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { ProfessionalSchema, ProfessionalSchemaType } from '@/validation/candidateRegister/ProfessionalExperience';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type ProfessionalExperience = {
  company: string;
  description: string;
  startDate: string;
  endDate: string;
};

const useProfessionalExperienceForm = () => {
  const router = useRouter();
  const { setCurrentStep, step3, step4, step5, setStep4 } = useStepsRegistration();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ProfessionalSchemaType>({
    resolver: yupResolver(ProfessionalSchema),
    mode: 'onChange',
    defaultValues: {
      isFirstJob: false,
      experiences: [{ company: '', description: '', startDate: '', endDate: '' }],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'experiences',
    rules: { maxLength: 3 },
  });

  useEffect(() => {
    setCurrentStep(4);
    let data = step4.formData;
    if (!data) {
      const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEYS.step4);
      data = sessionData ? JSON.parse(sessionData) : null;
      if (!data) return;
    }
    const isFirstJob = data.isFirstJob;
    const experiences = isFirstJob ? [] : data.experiences;
    setValue('isFirstJob', isFirstJob);
    replace(experiences);
  }, []);

  const storeFormDataInSession = (data: ProfessionalSchemaType) => {
    const step4Data = { ...step4, formData: data };
    setStep4(step4Data);
    sessionStorage.setItem(SESSION_STORAGE_KEYS.step4, JSON.stringify(data));
  };

  const addExperience = () => {
    if (fields.length < 3) {
      append({ company: '', description: '', startDate: '', endDate: '' });
    }
  };
  const removeExperience = (index: number) => {
    if (fields.length === 0) return;
    const currentData = getValues('experiences');
    const isFirstJob = getValues('isFirstJob');
    const newExperiencesValues = currentData.filter((_, idx) => idx !== index);
    storeFormDataInSession({ experiences: newExperiencesValues, isFirstJob });
    remove(index);
  };

  const onFistJobChange = (isFirstJob: boolean) => {
    setValue('isFirstJob', isFirstJob);

    // Prepare new experiences array
    const experiences = isFirstJob ? [] : [{ company: '', description: '', startDate: '', endDate: '' }];

    // Update field array and errors
    replace(experiences);
    clearErrors('experiences');

    // Prepare and save form data
    storeFormDataInSession({ isFirstJob, experiences });
  };

  const onDateChange = (value: string, index: number, field: 'startDate' | 'endDate') => {
    const maskedValue = ddmmyyyyMask(value);
    setValue(`experiences.${index}.${field}`, maskedValue, { shouldValidate: true });
    if (field === 'startDate') {
      const endDateErrors = errors.experiences?.[index]?.endDate;
      if (endDateErrors) trigger(`experiences.${index}.endDate`);
      return;
    }
    const startDateErrors = errors.experiences?.[index]?.startDate;
    if (startDateErrors) trigger(`experiences.${index}.startDate`);
  };

  const storeValuesInSession = (value: string, index: number, field: keyof ProfessionalExperience) => {
    const currentData = getValues('experiences');
    const isFirstJob = getValues('isFirstJob');
    const newExperiencesValues = currentData.map((experience, idx) =>
      idx === index ? { ...experience, [field]: value } : experience,
    );
    storeFormDataInSession({ experiences: newExperiencesValues, isFirstJob });
  };

  const onFormSubmit = (data: ProfessionalSchemaType) => {
    console.log(data);
    router.push(step5.pathname);
  };

  const back = () => {
    router.push(step3.pathname);
  };

  const hookform = {
    register,
    handleSubmit,
    errors,
  };

  return {
    isFirstjob: watch('isFirstJob'),
    fields,
    addExperience,
    removeExperience,
    onFistJobChange,
    onDateChange,
    storeValuesInSession,
    onFormSubmit,
    back,
    hookform,
  };
};
export default useProfessionalExperienceForm;

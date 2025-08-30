import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { IOption } from '@/interfaces/option';
import { getLanguages } from '@/services/language/languageService';
import { notifyError } from '@/utils/handleToast';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { AcademicDataSchema, AcademicDataSchemaType } from '@/validation/candidateRegister/AcademicData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export type EducationEntry = {
  instituition: string;
  course: string;
  startDate: string;
  endDate: string;
};
const levels: IOption[] = [
  { label: 'Básico', value: '1' },
  { label: 'Intermediário', value: '2' },
  { label: 'Avançado', value: '3' },
];

const useAcademicBackgroundForm = () => {
  const { setCurrentStep, step2, step3, setStep3, step4 } = useStepsRegistration();
  const router = useRouter();
  const [languagesList, setLanguagesList] = useState<IOption[]>([]);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<AcademicDataSchemaType>({
    resolver: yupResolver(AcademicDataSchema),
    mode: 'onChange',
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    rules: { maxLength: 5 },
    name: 'languages',
  });
  const {
    fields: educationArray,
    append: appendEducation,
    remove: removeEducation,
    replace: replaceEducation,
  } = useFieldArray({
    control,
    name: 'education',
    rules: { maxLength: 3 },
  });

  useEffect(() => {
    const retrieveLanguages = async () => {
      const result = await getLanguages();
      if (result.error) {
        notifyError(result.error);
        return;
      }
      if (result.data) {
        const options = result.data.map(lang => ({
          label: lang.idioma,
          value: lang.idioma,
        }));
        setLanguagesList(options);
      }
    };
    retrieveLanguages();

    setCurrentStep(3);

    let storedData = step3.formData;
    if (!storedData) {
      const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEYS.step3);
      storedData = sessionData ? JSON.parse(sessionData) : null;
      if (!storedData) {
        setValue('education', [
          {
            instituition: '',
            course: '',
            startDate: '',
            endDate: '',
          },
        ]);
        return;
      }
    }

    if (storedData.languages && storedData.languages.length > 0) {
      replace(storedData.languages);
    }

    if (storedData.education && storedData.education.length > 0) {
      replaceEducation(storedData.education);
    }
  }, []);

  // It synchronizes the available languages with the currently selected ones.
  useEffect(() => {
    const languageValues = getValues('languages') || [];
    const educationValues = getValues('education') || [];

    const newValues = { languages: languageValues, education: educationValues };
    setStep3(prev => ({ ...prev, formData: newValues }));
    sessionStorage.setItem(SESSION_STORAGE_KEYS.step3, JSON.stringify(newValues));
  }, [fields]);

  const back = () => {
    router.push(step2.pathname);
  };

  // education date input handler with mask
  const onDateChange = (value: string, index: number, field: 'startDate' | 'endDate') => {
    const formattedDate = ddmmyyyyMask(value);
    setValue(`education.${index}.${field}`, formattedDate, { shouldValidate: true });
    if (field === 'endDate') {
      const startDateErrors = errors.education?.[index]?.startDate;
      if (startDateErrors) {
        trigger(`education.${index}.startDate`);
      }
      return;
    }
    const endDateErrors = errors.education?.[index]?.endDate;
    if (endDateErrors) {
      trigger(`education.${index}.endDate`);
    }
  };

  // education input handler to store values in session storage
  const storeValues = (value: string, index: number, field: keyof EducationEntry) => {
    const eduValues = getValues('education') || [];
    const languagesValues = getValues('languages') || [];
    const newEducationValues = eduValues.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu));
    const newValues = { education: newEducationValues, languages: languagesValues };
    setStep3(prev => ({ ...prev, formData: newValues }));
    sessionStorage.setItem(SESSION_STORAGE_KEYS.step3, JSON.stringify(newValues));
  };

  const onFormSubmit = (data: AcademicDataSchemaType) => {
    if (data.education?.length === 0) {
      notifyError('Adicione ao menos uma formação acadêmica para prosseguir');
      return;
    }

    const hasDuplicatedLanguages =
      data.languages &&
      data.languages.some((lang, idx) => data.languages?.findIndex(l => l.language === lang.language) !== idx);

    if (hasDuplicatedLanguages) {
      notifyError('Você adicionou idiomas duplicados, por favor verifique.');
      return;
    }

    setStep3(prev => ({ ...prev, formData: data }));
    sessionStorage.setItem(SESSION_STORAGE_KEYS.step3, JSON.stringify(data));
    router.push(step4.pathname);
  };

  const hookform = {
    control,
    register,
    handleSubmit,
    errors,
    setValue,
  };
  const languageFieldArray = {
    fields,
    append,
    remove,
  };
  const educationFieldArray = {
    educationArray,
    appendEducation,
    removeEducation,
  };

  return {
    languagesList,
    levels,
    hookform,
    languageFieldArray,
    educationFieldArray,
    onDateChange,
    storeValues,
    onFormSubmit,
    back,
  };
};
export default useAcademicBackgroundForm;

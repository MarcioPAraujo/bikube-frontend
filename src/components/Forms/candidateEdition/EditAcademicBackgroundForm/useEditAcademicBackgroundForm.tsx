import { IOption } from '@/interfaces/option';
import { notifyError } from '@/utils/handleToast';
import languages from '@/utils/languages';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import { AcademicDataSchema, AcademicDataSchemaType } from '@/validation/candidateRegister/AcademicData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const levels: IOption[] = [
  { label: 'Básico', value: '1' },
  { label: 'Intermediário', value: '2' },
  { label: 'Avançado', value: '3' },
];

const useEditAcademicBackgroundForm = (defaultValues: AcademicDataSchemaType, onClose: VoidFunction) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [languagesList, setLanguagesList] = useState<IOption[]>([]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AcademicDataSchemaType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(AcademicDataSchema),
  });

  const {
    fields: languagesArray,
    append: addLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    rules: { maxLength: 5 },
    name: 'languages',
  });

  const {
    fields: educationArray,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
    rules: { maxLength: 3 },
  });

  useEffect(() => {
    /*
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
    */
    setLanguagesList(languages);
  }, []);

  const handleClose = () => {
    setWarningModalOpen(false);
    setSuccessModalOpen(false);
    reset(defaultValues);
    onClose();
  };

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
    console.log('Submitted data:', data);
    setSuccessModalOpen(true);
  };

  const hookform = {
    control,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  };
  const languageFieldArray = { languagesArray, addLanguage, removeLanguage };
  const educationFieldArray = { educationArray, appendEducation, removeEducation };

  return {
    languagesList,
    levels,
    onDateChange,
    handleClose,
    warningModalOpen,
    setWarningModalOpen,
    successModalOpen,
    onFormSubmit,
    hookform,
    languageFieldArray,
    educationFieldArray,
  };
};
export default useEditAcademicBackgroundForm;

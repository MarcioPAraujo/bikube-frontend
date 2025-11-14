import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import { ICandidateProfileEditBodyRequest } from '@/interfaces/candidate/candidateProfileEditBodyRequest';
import { IOption } from '@/interfaces/option';
import { editCandidateById } from '@/services/candidate/candidateService';
import { getLanguages } from '@/services/language/languageService';
import { notifyError } from '@/utils/handleToast';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import {
  AcademicDataSchema,
  AcademicDataSchemaType,
} from '@/validation/candidateRegister/AcademicData';
import { yupResolver } from '@hookform/resolvers/yup';
import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const levels: IOption[] = [
  { label: 'Básico', value: '1' },
  { label: 'Intermediário', value: '2' },
  { label: 'Avançado', value: '3' },
];

const useEditAcademicBackgroundForm = (
  defaultValues: AcademicDataSchemaType,
  onClose: VoidFunction,
  candidateData: ICandidateDetailsResponse,
) => {
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
  }, []);

  const handleClose = () => {
    setWarningModalOpen(false);
    setSuccessModalOpen(false);
    reset(defaultValues);
    onClose();
  };

  const onDateChange = (
    value: string,
    index: number,
    field: 'startDate' | 'endDate',
  ) => {
    const formattedDate = ddmmyyyyMask(value);
    setValue(`education.${index}.${field}`, formattedDate, {
      shouldValidate: true,
    });
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

  const buildBody = (data: AcademicDataSchemaType) => {
    const body: ICandidateProfileEditBodyRequest = {
      ...candidateData,
      formacaoAcademica: data.education
        ? data.education.map(edu => {
            const start = parse(edu.startDate, 'dd/MM/yyyy', new Date());
            const end = parse(edu.endDate, 'dd/MM/yyyy', new Date());
            return {
              curso: edu.course,
              instituicao: edu.instituition,
              dataFim: format(end, 'yyyy-MM-dd'),
              dataInicio: format(start, 'yyyy-MM-dd'),
              situacao: start > end ? 'Cursando' : 'Concluído',
            };
          })
        : [],
      idiomas: data.languages
        ? data.languages.map(lang => ({
            idioma: lang.language,
            nivel: lang.level,
          }))
        : [],
    };
    return body;
  };

  const onFormSubmit = async (data: AcademicDataSchemaType) => {
    if (data.education?.length === 0) {
      notifyError('Adicione ao menos uma formação acadêmica para prosseguir');
      return;
    }

    const hasDuplicatedLanguages =
      data.languages &&
      data.languages.some(
        (lang, idx) =>
          data.languages?.findIndex(l => l.language === lang.language) !== idx,
      );

    if (hasDuplicatedLanguages) {
      notifyError('Você adicionou idiomas duplicados, por favor verifique.');
      return;
    }

    const body = buildBody(data);

    const result = await editCandidateById(body);
    if (result.error) {
      notifyError(result.error);
      return;
    }
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
  const educationFieldArray = {
    educationArray,
    appendEducation,
    removeEducation,
  };

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

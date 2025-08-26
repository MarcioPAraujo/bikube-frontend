import { AcademicDataSchema, AcademicDataSchemaType } from '@/validation/candidateRegister/AcademicData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import FormTitle from '../FormTitle/FormTitle';
import {
  AddLanguageButton,
  Content,
  Form,
  Fieldset,
  LanguageWrapper,
  Legend,
  RemoveButton,
  EducationWrapper,
  RadioOptions,
  OptionsWrapper,
  RadioErrorMessage,
} from './academicBackgroundFormStyles';
import { useRouter } from 'next/navigation';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import { IOption } from '@/interfaces/option';
import languages from '@/utils/languages';
import { useEffect, useState } from 'react';
import RadioInput from '@/components/Inputs/Radio/Radio';
import { Icons } from '@/components/Icons/Icons';
import { theme } from '@/styles/theme';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import { notifyError } from '@/utils/handleToast';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';

export type EducationEntry = {
  instituition: string;
  course: string;
  startDate: string;
  endDate: string;
};
const levels: string[] = ['Básico', 'Intermediário', 'Avançado'];

const AcedmicBackgroundForm: React.FC = () => {
  const { setCurrentStep, step2, step3, setStep3, step4 } = useStepsRegistration();
  const router = useRouter();
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

  const { fields, append, remove } = useFieldArray({
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
      storedData.languages.forEach((lang: { language: string; level: string }, index: number) => {
        if (index === 0) {
          setValue(`languages.${index}.language`, lang.language);
          setValue(`languages.${index}.level`, lang.level);
        } else {
          append({ language: lang.language, level: lang.level });
        }
      });
    }

    if (storedData.education && storedData.education.length > 0) {
      storedData.education.forEach(
        (edu: { instituition: string; course: string; startDate: string; endDate: string }, index: number) => {
          if (index === 0) {
            setValue(`education.${index}.instituition`, edu.instituition);
            setValue(`education.${index}.course`, edu.course);
            setValue(`education.${index}.startDate`, edu.startDate);
            setValue(`education.${index}.endDate`, edu.endDate);
          } else {
            appendEducation({
              instituition: edu.instituition,
              course: edu.course,
              startDate: edu.startDate,
              endDate: edu.endDate,
            });
          }
        },
      );
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
    console.log('submitted data: ', data);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormTitle title="Formação acadêmica" onBack={() => router.push(step2.pathname)} />
      <Content>
        <Fieldset>
          <Legend>Idiomas, adicione até 5 idiomas que ache relevante - (Opcional)</Legend>
          {fields.length < 5 && (
            <AddLanguageButton type="button" onClick={() => append({ language: '', level: '' })}>
              adicionar
            </AddLanguageButton>
          )}
          {fields.map((field, index) => (
            <LanguageWrapper key={field.id}>
              <Controller
                control={control}
                name={`languages.${index}.language`}
                render={({ field }) => (
                  <UnderlinedSelect
                    id={`languages.${index}.language`}
                    enableSearch
                    label="Idioma"
                    placeholder="Selecione o idioma"
                    options={languages}
                    selectedOption={field.value}
                    onChange={field.onChange}
                    error={errors.languages?.[index]?.language}
                  />
                )}
              />
              <RadioOptions>
                <OptionsWrapper>
                  {levels.map(level => (
                    <RadioInput
                      key={`${field.id}${level}`}
                      id={`${field.id}${level}`}
                      label={level}
                      value={level}
                      register={register(`languages.${index}.level`)}
                    />
                  ))}
                </OptionsWrapper>
                {errors.languages?.[index]?.level && (
                  <RadioErrorMessage>{errors.languages[index]?.level?.message}</RadioErrorMessage>
                )}
              </RadioOptions>
              <div>
                <RemoveButton type="button" onClick={() => remove(index)}>
                  <Icons.Trash size={20} color={theme.colors.GRAY.hex_747474} />
                </RemoveButton>
              </div>
            </LanguageWrapper>
          ))}
        </Fieldset>
        <Fieldset>
          <Legend>Formação acadêmica, adicione até 3 formações - (Obrigatório)</Legend>
          {educationArray.length < 3 && (
            <AddLanguageButton
              type="button"
              onClick={() => appendEducation({ instituition: '', course: '', startDate: '', endDate: '' })}
            >
              adicionar
            </AddLanguageButton>
          )}
          {educationArray.map((field, index) => (
            <EducationWrapper key={field.id}>
              <UnderlinedInput
                id={`instituition-${field.id}`}
                labelText="Instituição"
                placeholder="Nome da instituição"
                register={register(`education.${index}.instituition`, {
                  onChange: e => storeValues(e.target.value, index, 'instituition'),
                })}
                errorType={errors.education?.[index]?.instituition}
              />
              <UnderlinedInput
                id={`course-${field.id}`}
                labelText="Curso"
                placeholder="Nome do curso"
                register={register(`education.${index}.course`, {
                  onChange: e => storeValues(e.target.value, index, 'course'),
                })}
                errorType={errors.education?.[index]?.course}
              />
              <UnderlinedInput
                id={`startDate-${field.id}`}
                labelText="Data de início"
                placeholder="DD/MM/AAAA"
                register={register(`education.${index}.startDate`, {
                  onChange: e => {
                    onDateChange(e.target.value, index, 'startDate');
                    storeValues(ddmmyyyyMask(e.target.value), index, 'startDate');
                  },
                })}
                errorType={errors.education?.[index]?.startDate}
              />
              <UnderlinedInput
                id={`endDate-${field.id}`}
                labelText="Data de conclusão"
                placeholder="DD/MM/AAAA"
                register={register(`education.${index}.endDate`, {
                  onChange: e => {
                    onDateChange(e.target.value, index, 'endDate');
                    storeValues(ddmmyyyyMask(e.target.value), index, 'endDate');
                  },
                })}
                errorType={errors.education?.[index]?.endDate}
              />
              <div>
                <RemoveButton type="button" onClick={() => removeEducation(index)}>
                  <Icons.Trash size={20} color={theme.colors.GRAY.hex_747474} />
                </RemoveButton>
              </div>
            </EducationWrapper>
          ))}
        </Fieldset>
      </Content>
    </Form>
  );
};
export default AcedmicBackgroundForm;

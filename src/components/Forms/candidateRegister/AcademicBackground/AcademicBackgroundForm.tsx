import { AcademicDataSchema, AcademicDataSchemaType } from '@/validation/candidateRegister/AcademicData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import FormTitle from '../FormTitle/FormTitle';
import {
  AddLanguageButton,
  Content,
  Form,
  LanguageWrapper,
  Legend,
  RemoveButton,
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

const languageOptions: IOption[] = languages.map(lang => ({ label: lang, value: lang }));
const levels: string[] = ['Básico', 'Intermediário', 'Avançado'];

const AcedmicBackgroundForm: React.FC = () => {
  const { setCurrentStep, step2, step3, setStep3, step4 } = useStepsRegistration();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AcademicDataSchemaType>({
    resolver: yupResolver(AcademicDataSchema),
    mode: 'onTouched',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    rules: { maxLength: 5 },
    name: 'languages',
  });

  const [availableLanguages, setAvailableLanguages] = useState<IOption[]>(languageOptions);
  const [selectedLanguages, setSelectedLanguages] = useState<Record<string, IOption>>({});
  const [selectedLevels, setSelectedLevels] = useState<Record<string, string>>({});

  // It synchronizes the available languages with the currently selected ones.
  useEffect(() => {
    const currentSelectedLanguages = Object.values(selectedLanguages);

    const newAvailableLanguages = languageOptions.filter(
      lang => !currentSelectedLanguages.some(selected => selected.value === lang.value),
    );

    setAvailableLanguages(newAvailableLanguages);
  }, [fields, selectedLanguages]);

  const addLanguage = () => {
    append({ language: '', level: '' });
  };

  const removeLanguage = (index: number, fieldId: string) => {
    remove(index); // remove from field array

    const newSelectedLevels = { ...selectedLevels };
    delete newSelectedLevels[fieldId];

    const newSelectedLanguages = { ...selectedLanguages };
    delete newSelectedLanguages[fieldId];

    setSelectedLevels(newSelectedLevels);
    setSelectedLanguages(newSelectedLanguages);
  };

  const onLanguageChange = (fieldId: string, option: IOption, index: number) => {
    // Atualiza o idioma selecionado no estado local
    const newSelectedLanguages = { ...selectedLanguages, [fieldId]: option };
    setSelectedLanguages(newSelectedLanguages);
    // Atualiza o valor do campo no react-hook-form
    setValue(`languages.${index}.language`, option.label);
    // Remove o idioma selecionado das opções disponíveis
    const newAvailableLanguages = availableLanguages.filter(lang => lang.value !== option.value);
    setAvailableLanguages(newAvailableLanguages);
  };

  const onLevelChange = (fieldId: string, level: string, index: number) => {
    const newSelectedLevels = { ...selectedLevels, [fieldId]: level };
    setSelectedLevels(newSelectedLevels);
    setValue(`languages.${index}.level`, level);
  };

  console.log(getValues());

  return (
    <Form>
      <FormTitle title="Formação acadêmica" onBack={() => router.push(step4.pathname)} />
      <Content>
        <Legend>Idiomas, adicione até 5 idiomas que ache relevante - (Opcional)</Legend>
        {fields.length < 5 && (
          <AddLanguageButton type="button" onClick={addLanguage}>
            adicionar
          </AddLanguageButton>
        )}
        {fields.map((field, index) => (
          <LanguageWrapper key={field.id}>
            <UnderlinedSelect
              id={field.id}
              label="Idioma"
              placeholder="Selecione o idioma"
              options={availableLanguages}
              selectedOption={selectedLanguages[field.id] || { label: '', value: '' }}
              onChange={(option: IOption) => onLanguageChange(field.id, option, index)}
              error={errors.languages?.[index]?.language}
            />
            {levels.map(level => (
              <RadioInput
                key={`${field.id}${level}`}
                id={`${field.id}${level}`}
                radioname={`${field.id}`}
                label={level}
                isChecked={selectedLevels[field.id] === level}
                onChange={() => onLevelChange(field.id, level, index)}
              />
            ))}
            <div>
              <RemoveButton type="button" onClick={() => removeLanguage(index, field.id)}>
                <Icons.Trash size={20} color={theme.colors.GRAY.hex_747474} />
              </RemoveButton>
            </div>
          </LanguageWrapper>
        ))}
      </Content>
    </Form>
  );
};
export default AcedmicBackgroundForm;

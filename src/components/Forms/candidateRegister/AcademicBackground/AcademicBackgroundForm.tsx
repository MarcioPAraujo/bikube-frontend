import { AcademicDataSchema, AcademicDataSchemaType } from '@/validation/candidateRegister/AcademicData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import FormTitle from '../FormTitle/FormTitle';
import { Form } from './academicBackgroundFormStyles';
import { useRouter } from 'next/navigation';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import { IOption } from '@/interfaces/option';
import languages from '@/utils/languages';
import { useEffect, useState } from 'react';

const languageOptions: IOption[] = languages.map(lang => ({ label: lang, value: lang }));

const AcedmicBackgroundForm: React.FC = () => {
  const { setCurrentStep, step2, step3, setStep3, step4 } = useStepsRegistration();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setValue,
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

  // fix apend available languages when remove
  const removeLanguage = (index: number, fieldId: string) => {
    remove(index); // remove from field array
    const newSelectedLanguages = { ...selectedLanguages };
    delete newSelectedLanguages[fieldId];
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

  return (
    <Form>
      <FormTitle title="Formação acadêmica" onBack={() => router.push(step4.pathname)} />
      <div>
        <p>Idiomas, adicione até 5 idiomas que ache relevante - (Opcional)</p>
        <button type="button" onClick={addLanguage}>
          adicionar
        </button>
        {fields.map((field, index) => (
          <div key={field.id}>
            <UnderlinedSelect
              id={field.id}
              label="Idioma"
              placeholder="Selecione o idioma"
              options={availableLanguages}
              selectedOption={selectedLanguages[field.id] || { label: '', value: '' }}
              onChange={(option: IOption) => onLanguageChange(field.id, option, index)}
              error={errors.languages?.[index]?.language}
            />
            <UnderlinedInput
              id={field.id}
              labelText="Nível de domínio"
              placeholder="Insira o nível de domínio"
              register={register(`languages.${index}.level`)}
              errorType={errors.languages?.[index]?.level}
            />
            <button type="button" onClick={() => removeLanguage(index, field.id)}>
              remover
            </button>
          </div>
        ))}
      </div>
    </Form>
  );
};
export default AcedmicBackgroundForm;

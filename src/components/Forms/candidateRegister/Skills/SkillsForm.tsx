import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SkillsSchema, SkillsSchemaType } from '@/validation/candidateRegister/SkillSchema';
import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { useRouter } from 'next/navigation';
import FormTitle from '../FormTitle/FormTitle';
import { AddButton, Content, Description, FieldWrapper, Form, RemoveButton } from './skillsFormStyles';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import { IOption } from '@/interfaces/option';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import { Icons } from '@/components/Icons/Icons';
import { theme } from '@/styles/theme';
import { notifyError } from '@/utils/handleToast';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { useEffect } from 'react';

const skilsOptions: IOption[] = Array.from({ length: 100 }, (_, i) => ({
  label: `Skill ${i + 1}`,
  value: `skill_${i + 1}`,
}));

const SkillsForm = () => {
  const router = useRouter();
  const { setCurrentStep, step4, setStep5, step5 } = useStepsRegistration();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
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
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle onBack={() => router.push(step4.pathname)} title="Habilidades e competências" />
      <Content>
        <Description>Adicione até 10 habilidades diferentes</Description>
        <AddButton
          type="button"
          disabled={fields.length === 10}
          onClick={() => append({ competency: '', periodInMonths: '' })}
        >
          + Adicionar habilidade
        </AddButton>
        {fields.map((field, index) => (
          <FieldWrapper key={field.id}>
            <Controller
              name={`skills.${index}.competency`}
              control={control}
              render={({ field }) => (
                <UnderlinedSelect
                  id={`skills-${index}-competency`}
                  label="Habilidade ou Competência"
                  placeholder="Selecione"
                  options={skilsOptions}
                  selectedOption={field.value}
                  onChange={(value: string) => {
                    field.onChange(value);
                    storeOnChange(value, index, 'competency');
                  }}
                  error={errors.skills?.[index]?.competency}
                  enableSearch
                />
              )}
            />
            <UnderlinedInput
              id={`skills-${index}-periodInMonths`}
              labelText="Período de experiência (em meses)"
              placeholder='Ex: "12"'
              register={register(`skills.${index}.periodInMonths`, {
                onChange: e => {
                  const value = e.target.value.replace(/\D/g, '');
                  setValue(`skills.${index}.periodInMonths`, value);
                  storeOnChange(value, index, 'periodInMonths');
                },
              })}
              errorType={errors.skills?.[index]?.periodInMonths}
            />
            <div>
              <RemoveButton type="button" onClick={() => onRemove(index)} disabled={fields.length === 1}>
                <Icons.Trash size={20} color={theme.colors.GRAY.hex_747474} />
              </RemoveButton>
            </div>
          </FieldWrapper>
        ))}
      </Content>
    </Form>
  );
};
export default SkillsForm;

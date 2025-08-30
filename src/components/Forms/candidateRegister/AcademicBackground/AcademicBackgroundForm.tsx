import { Controller } from 'react-hook-form';
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
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import RadioInput from '@/components/Inputs/Radio/Radio';
import { Icons } from '@/components/Icons/Icons';
import { theme } from '@/styles/theme';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import useAcademicBackgroundForm from './useAcademicBackgroundForm';

const AcedmicBackgroundForm: React.FC = () => {
  const {
    back,
    languagesList,
    levels,
    onDateChange,
    storeValues,
    onFormSubmit,
    educationFieldArray: { appendEducation, removeEducation, educationArray },
    languageFieldArray: { append, remove, fields },
    hookform: { control, register, handleSubmit, errors },
  } = useAcademicBackgroundForm();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormTitle title="Formação acadêmica" onBack={back} />
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
                    options={languagesList}
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
                      key={`${field.id}${level.value}`}
                      id={`${field.id}${level.value}`}
                      label={level.label}
                      value={level.value}
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

import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfessionalSchema, ProfessionalSchemaType } from '@/validation/candidateRegister/ProfessionalExperience';
import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import FormTitle from '../FormTitle/FormTitle';
import {
  AddButton,
  CheckboxInput,
  CheckboxLabel,
  Content,
  Description,
  Fields,
  Form,
  RemoveButton,
} from './professionalExperieceFormStyle';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/Icons/Icons';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import { theme } from '@/styles/theme';
import Textarea from '@/components/Inputs/Textarea/Textarea';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { useEffect } from 'react';
import useProfessionalExperienceForm from './useProfessionalExperienceForm';

type ProfessionalExperience = {
  company: string;
  description: string;
  startDate: string;
  endDate: string;
};

const ProfessionalExperienceForm: React.FC = () => {
  const {
    hookform: { errors, register, handleSubmit },
    fields,
    addExperience,
    removeExperience,
    onFistJobChange,
    onDateChange,
    storeValuesInSession,
    onFormSubmit,
    back,
    isFirstjob,
  } = useProfessionalExperienceForm();

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormTitle title="Experiêcia profissional" onBack={back} />
      <Content>
        <Description>Coloque até 3 experiêcnias profissioanis que você acha relevante</Description>
        {fields.length < 3 && (
          <AddButton type="button" disabled={isFirstjob} onClick={addExperience}>
            + Adicionar
          </AddButton>
        )}
        <CheckboxLabel htmlFor="first-job">
          <div>
            <CheckboxInput
              type="checkbox"
              id="first-job"
              {...register('isFirstJob', {
                onChange: e => onFistJobChange(e.target.checked),
              })}
            />
            <Icons.Check size={14} color="white" />
          </div>
          Primeira experiência profissional
        </CheckboxLabel>
        {fields.map((field, index) => (
          <Fields key={field.id}>
            <UnderlinedInput
              id={`company-${index}`}
              labelText="Nome da empresa"
              placeholder="Insira o nome da empresa onde trabalhou"
              register={register(`experiences.${index}.company`, {
                onBlur: e => storeValuesInSession(e.target.value, index, 'company'),
              })}
              errorType={errors.experiences?.[index]?.company}
            />
            <UnderlinedInput
              id={`startDate-${index}`}
              labelText="Data de início"
              placeholder="dd/mm/aaaa"
              register={register(`experiences.${index}.startDate`, {
                onChange: e => onDateChange(e.target.value, index, 'startDate'),
                onBlur: e => storeValuesInSession(e.target.value, index, 'startDate'),
              })}
              errorType={errors.experiences?.[index]?.startDate}
            />
            <UnderlinedInput
              id={`endDate-${index}`}
              labelText="Data de fim"
              placeholder="dd/mm/aaaa"
              register={register(`experiences.${index}.endDate`, {
                onChange: e => onDateChange(e.target.value, index, 'endDate'),
                onBlur: e => storeValuesInSession(e.target.value, index, 'endDate'),
              })}
              errorType={errors.experiences?.[index]?.endDate}
            />
            <Textarea
              id={`description-${index}`}
              label="Descrição"
              placeholder="Descreva suas atividades e conquistas"
              register={register(`experiences.${index}.description`, {
                onBlur: e => storeValuesInSession(e.target.value, index, 'description'),
              })}
              error={errors.experiences?.[index]?.description}
            />
            <div>
              <RemoveButton type="button" onClick={() => removeExperience(index)}>
                <Icons.Trash size={20} color={theme.colors.GRAY.hex_747474} />
              </RemoveButton>
            </div>
          </Fields>
        ))}
      </Content>
    </Form>
  );
};
export default ProfessionalExperienceForm;

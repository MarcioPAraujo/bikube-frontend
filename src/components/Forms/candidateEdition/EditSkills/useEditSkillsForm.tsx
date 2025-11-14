import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import { ICandidateProfileEditBodyRequest } from '@/interfaces/candidate/candidateProfileEditBodyRequest';
import { IOption } from '@/interfaces/option';
import { editCandidateById } from '@/services/candidate/candidateService';
import { getSkills } from '@/services/skilss/skilssService';
import { notifyError } from '@/utils/handleToast';
import {
  SkillsSchema,
  SkillsSchemaType,
} from '@/validation/candidateRegister/SkillSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface IEditSkillsFormProps {
  defaultValues: SkillsSchemaType;
  refetch: VoidFunction;
  candidateData: ICandidateDetailsResponse;
}

const useEditSkillsForm = ({
  candidateData,
  defaultValues,
  refetch,
}: IEditSkillsFormProps) => {
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
  const [skillsOptions, setSkillsOptions] = useState<IOption[]>([]);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SkillsSchemaType>({
    resolver: yupResolver(SkillsSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
    rules: { minLength: 1, maxLength: 10 },
  });

  useEffect(() => {
    const retrieveSkills = async () => {
      const result = await getSkills();
      if (result.error) {
        notifyError(result.error);
        return;
      }
      if (result.data) {
        const options = result.data.map(skill => ({
          label: skill.habilidade,
          value: skill.habilidade,
        }));
        setSkillsOptions(options);
      }
    };
    retrieveSkills();
  }, []);

  const onPeriodChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value === '') {
      setValue(`skills.${index}.periodInMonths`, '0');
      return;
    }
    const filteredNumber = Math.min(Number(value), 360).toString();
    setValue(`skills.${index}.periodInMonths`, filteredNumber);
  };

  const onSubmit = async (data: SkillsSchemaType) => {
    const hasDuplicates = data.skills.some(
      (skill, index) =>
        data.skills.findIndex(s => s.competency === skill.competency) !== index,
    );
    if (hasDuplicates) {
      notifyError('Habilidades duplicadas não são permitidas.');
      return;
    }

    const body: ICandidateProfileEditBodyRequest = {
      ...candidateData,
      habilidades: data.skills.map(skill => ({
        habilidade: skill.competency,
        tempoExperiencia: Number(skill.periodInMonths),
      })),
    };

    const result = await editCandidateById(body);
    if (result.error) {
      notifyError(result.error);
      return;
    }

    refetch();
    setSuccessModalOpen(true);
  };

  const hookform = {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
  };
  const skillsArray = {
    fields,
    append,
    remove,
  };
  const modals = {
    warningModalOpen,
    setWarningModalOpen,
    successModalOpen,
    setSuccessModalOpen,
  };
  return {
    hookform,
    skillsArray,
    modals,
    skillsOptions,
    onSubmit,
    onPeriodChange,
  };
};
export default useEditSkillsForm;

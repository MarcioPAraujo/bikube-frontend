import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import { ICandidateProfileEditBodyRequest } from '@/interfaces/candidate/candidateProfileEditBodyRequest';
import { editCandidateById } from '@/services/candidate/candidateService';
import { notifyError } from '@/utils/handleToast';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import {
  ProfessionalSchema,
  ProfessionalSchemaType,
} from '@/validation/candidateRegister/ProfessionalExperience';
import { yupResolver } from '@hookform/resolvers/yup';
import { format, parse } from 'date-fns';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface UseProfessionalExperienceProps {
  defaultValues: ProfessionalSchemaType;
  refetch: VoidFunction;
  candidateData: ICandidateDetailsResponse;
}
const useProfessionalExperience = ({
  defaultValues,
  refetch,
  candidateData,
}: UseProfessionalExperienceProps) => {
  const { candidate } = useCandidateAuth();
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ProfessionalSchemaType>({
    resolver: yupResolver(ProfessionalSchema),
    mode: 'onChange',
    defaultValues,
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'experiences',
    rules: { maxLength: 3 },
  });

  const onFistJobChange = (isFirstJob: boolean) => {
    setValue('isFirstJob', isFirstJob);

    // Prepare new experiences array
    const experiences = isFirstJob
      ? []
      : [{ company: '', description: '', startDate: '', endDate: '' }];

    // Update field array and errors
    replace(experiences);
    clearErrors('experiences');
  };

  const onDateChange = (
    value: string,
    index: number,
    field: 'startDate' | 'endDate',
  ) => {
    const maskedValue = ddmmyyyyMask(value);
    setValue(`experiences.${index}.${field}`, maskedValue, {
      shouldValidate: true,
    });
    if (field === 'startDate') {
      const endDateErrors = errors.experiences?.[index]?.endDate;
      if (endDateErrors) trigger(`experiences.${index}.endDate`);
      return;
    }
    const startDateErrors = errors.experiences?.[index]?.startDate;
    if (startDateErrors) trigger(`experiences.${index}.startDate`);
  };

  const buildBody = (data: ProfessionalSchemaType) => {
    const candidateId = candidate?.id || '0';

    const body: ICandidateProfileEditBodyRequest = {
      ...candidateData,
      id: Number(candidateId),
      experiencias: data.isFirstJob
        ? []
        : data.experiences.map(exp => {
            const startDate = parse(exp.startDate, 'dd/MM/yyyy', new Date());
            const endDate = parse(exp.endDate, 'dd/MM/yyyy', new Date());
            return {
              empresa: exp.company,
              descricao: exp.description,
              dataInicio: format(startDate, 'yyyy-MM-dd'),
              dataFim: format(endDate, 'yyyy-MM-dd'),
            };
          }),
    };
    return body;
  };

  const onFormSubmit = async (data: ProfessionalSchemaType) => {
    const body = buildBody(data);

    const result = await editCandidateById(body);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    refetch();
    setSuccessModal(true);
  };

  const hookform = {
    register,
    handleSubmit,
    isSubmitting,
    watch,
    errors,
  };
  const modals = {
    successModal,
    warningModal,
    setWarningModal,
    setSuccessModal,
  };
  const fieldArray = { fields, append, remove };
  const handlers = { onDateChange, onFistJobChange, onFormSubmit };

  return { hookform, modals, fieldArray, handlers };
};
export default useProfessionalExperience;

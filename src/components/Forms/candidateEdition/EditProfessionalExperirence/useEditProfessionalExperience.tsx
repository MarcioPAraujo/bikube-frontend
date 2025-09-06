import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import {
  ProfessionalSchema,
  ProfessionalSchemaType,
} from '@/validation/candidateRegister/ProfessionalExperience';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const useProfessionalExperience = (defaultValues: ProfessionalSchemaType) => {
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

  const onFormSubmit = (data: ProfessionalSchemaType) => {
    console.log(data);
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

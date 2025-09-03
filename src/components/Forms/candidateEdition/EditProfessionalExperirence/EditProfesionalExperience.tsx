import ModalBackground from '@/components/modals/elements/ModalBackground';
import EditFormTitle from '../Elements/EditFormTitle/EditFormTitle';
import { useFieldArray, useForm } from 'react-hook-form';
import { ProfessionalSchema, ProfessionalSchemaType } from '@/validation/candidateRegister/ProfessionalExperience';
import { yupResolver } from '@hookform/resolvers/yup';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import CheckboxComponent from '@/components/Inputs/Checkbox';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import Textarea from '@/components/Inputs/Textarea/Textarea';
import { Icons } from '@/components/Icons/Icons';
import { Description, Field, Form } from './editProfessionalExperienceStyles';
import RemoveButton from '../Elements/RemoveButton/RemoveButton';
import AddButton from '../Elements/AddButton/AddButton';
import EditSubmitButtons from '../Elements/EditSubmitButtons/EditSubmitButtons';
import { useState } from 'react';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';

interface EditProfessionalExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: ProfessionalSchemaType;
}
const EditProfessionalExperience: React.FC<EditProfessionalExperienceProps> = ({ isOpen, onClose, defaultValues }) => {
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
    const experiences = isFirstJob ? [] : [{ company: '', description: '', startDate: '', endDate: '' }];

    // Update field array and errors
    replace(experiences);
    clearErrors('experiences');
  };

  const onDateChange = (value: string, index: number, field: 'startDate' | 'endDate') => {
    const maskedValue = ddmmyyyyMask(value);
    setValue(`experiences.${index}.${field}`, maskedValue, { shouldValidate: true });
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

  if (!isOpen) return null;

  if (warningModal) {
    return (
      <WarningModal
        isOpen={warningModal}
        title="Descartar alterações?"
        message="Se você sair agora, todas as alterações serão perdidas."
        cancelText="Continuar editando"
        confirmText="Descartar"
        onCancel={() => setWarningModal(false)}
        onConfirm={() => {
          setWarningModal(false);
          onClose();
        }}
      />
    );
  }

  if (successModal) {
    return (
      <SuccessModal
        isOpen={successModal}
        title="Experiência profissional atualizada com sucesso!"
        message="As suas informações de experiência profissional foram atualizadas com sucesso."
        buttonText="Ok"
        onClose={() => {
          setSuccessModal(false);
          onClose();
        }}
      />
    );
  }

  return (
    <ModalBackground>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <EditFormTitle title="Editar experiência profissional" />
        <Description>Coloque até 3 experiêcnias profissioanis que você acha relevante</Description>
        <CheckboxComponent
          id="first-job"
          register={register('isFirstJob', { onChange: e => onFistJobChange(e.target.checked) })}
        >
          Primeira experiência profissional
        </CheckboxComponent>
        {fields.length < 3 && (
          <AddButton
            label="+ Adicionar"
            onClick={() => append({ company: '', description: '', startDate: '', endDate: '' })}
            disabled={watch('isFirstJob')}
          />
        )}
        {fields.map((field, index) => (
          <Field key={field.id}>
            <UnderlinedInput
              id={`company-${index}`}
              labelText="Nome da empresa"
              placeholder="Insira o nome da empresa onde trabalhou"
              register={register(`experiences.${index}.company`)}
              errorType={errors.experiences?.[index]?.company}
            />
            <UnderlinedInput
              id={`startDate-${index}`}
              labelText="Data de início"
              placeholder="dd/mm/aaaa"
              register={register(`experiences.${index}.startDate`, {
                onChange: e => onDateChange(e.target.value, index, 'startDate'),
              })}
              errorType={errors.experiences?.[index]?.startDate}
            />
            <UnderlinedInput
              id={`endDate-${index}`}
              labelText="Data de fim"
              placeholder="dd/mm/aaaa"
              register={register(`experiences.${index}.endDate`, {
                onChange: e => onDateChange(e.target.value, index, 'endDate'),
              })}
              errorType={errors.experiences?.[index]?.endDate}
            />
            <Textarea
              id={`description-${index}`}
              label="Descrição"
              placeholder="Descreva suas atividades e conquistas"
              register={register(`experiences.${index}.description`)}
              error={errors.experiences?.[index]?.description}
            />
            <div>
              <RemoveButton onClick={() => remove(index)} />
            </div>
          </Field>
        ))}
        <EditSubmitButtons
          cancelButton={{ labelText: 'Cancelar', onClick: () => setWarningModal(true) }}
          submitButton={{ labelText: 'Salvar', disabled: isSubmitting }}
        />
      </Form>
    </ModalBackground>
  );
};
export default EditProfessionalExperience;

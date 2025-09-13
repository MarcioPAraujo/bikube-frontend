import ModalBackground from '@/components/modals/elements/ModalBackground';
import { Controller } from 'react-hook-form';
import { SkillsSchemaType } from '@/validation/candidateRegister/SkillSchema';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import AddButton from '../Elements/AddButton/AddButton';
import RemoveButton from '../Elements/RemoveButton/RemoveButton';
import { Description, Field, Form } from './editSkillsStyles';
import EditSubmitButtons from '../Elements/EditSubmitButtons/EditSubmitButtons';
import EditFormTitle from '../Elements/EditFormTitle/EditFormTitle';
import useEditSkillsForm from './useEditSkillsForm';

interface EditSkillsFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: SkillsSchemaType;
  data: ICandidateDetailsResponse;
}

const EditSkillsForm: React.FC<EditSkillsFormProps> = ({
  isOpen,
  onClose,
  defaultValues,
}) => {
  const {
    hookform: { control, register, handleSubmit, isSubmitting, errors },
    modals: {
      warningModalOpen,
      setWarningModalOpen,
      successModalOpen,
      setSuccessModalOpen,
    },
    skillsOptions,
    skillsArray: { fields, append, remove },
    onPeriodChange,
    onSubmit,
  } = useEditSkillsForm(defaultValues);

  if (!isOpen) return null;

  if (warningModalOpen) {
    return (
      <WarningModal
        isOpen={warningModalOpen}
        title="Descartar alterações?"
        message="Se você sair agora, todas as alterações feitas serão perdidas."
        cancelText="Continuar editando"
        confirmText="Descartar"
        onCancel={() => setWarningModalOpen(false)}
        onConfirm={() => {
          setWarningModalOpen(false);
          onClose();
        }}
      />
    );
  }

  if (successModalOpen) {
    return (
      <SuccessModal
        isOpen={successModalOpen}
        buttonText="Fechar"
        title="Habilidades atualizadas com sucesso!"
        message="Suas habilidades foram atualizadas com sucesso."
        onClose={() => {
          setSuccessModalOpen(false);
          onClose();
        }}
      />
    );
  }

  return (
    <ModalBackground>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <EditFormTitle title="Editar Habilidades" />
        <Description>Adicione até 10 habilidades diferentes</Description>
        <AddButton
          label="+ Adicionar"
          onClick={() => append({ competency: '', periodInMonths: '' })}
          disabled={fields.length >= 10}
        />
        {fields.map((field, index) => (
          <Field key={field.id}>
            <Controller
              name={`skills.${index}.competency`}
              control={control}
              render={({ field }) => (
                <UnderlinedSelect
                  id={`skills-${index}-competency`}
                  label="Habilidade ou Competência"
                  placeholder="Selecione"
                  options={skillsOptions}
                  selectedOption={field.value}
                  onChange={field.onChange}
                  error={errors.skills?.[index]?.competency}
                  enableSearch
                />
              )}
            />
            <UnderlinedInput
              id={`skills-${index}-periodInMonths`}
              labelText="Período (em meses) - máx 360 meses"
              placeholder='Ex: "12"'
              register={register(`skills.${index}.periodInMonths`, {
                onChange: e => onPeriodChange(e, index),
              })}
              errorType={errors.skills?.[index]?.periodInMonths}
            />
            <div>
              <RemoveButton
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              />
            </div>
          </Field>
        ))}
        <EditSubmitButtons
          cancelButton={{
            labelText: 'Cancelar',
            onClick: () => setWarningModalOpen(true),
          }}
          submitButton={{ labelText: 'Salvar', disabled: isSubmitting }}
        />
      </Form>
    </ModalBackground>
  );
};
export default EditSkillsForm;

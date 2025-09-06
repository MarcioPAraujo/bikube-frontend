import ModalBackground from '@/components/modals/elements/ModalBackground';
import { ProfessionalSchemaType } from '@/validation/candidateRegister/ProfessionalExperience';
import CheckboxComponent from '@/components/Inputs/Checkbox';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import Textarea from '@/components/Inputs/Textarea/Textarea';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { Description, Field, Form } from './editProfessionalExperienceStyles';
import RemoveButton from '../Elements/RemoveButton/RemoveButton';
import AddButton from '../Elements/AddButton/AddButton';
import EditSubmitButtons from '../Elements/EditSubmitButtons/EditSubmitButtons';
import EditFormTitle from '../Elements/EditFormTitle/EditFormTitle';
import useProfessionalExperience from './useEditProfessionalExperience';

interface EditProfessionalExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: ProfessionalSchemaType;
}
const EditProfessionalExperience: React.FC<EditProfessionalExperienceProps> = ({
  isOpen,
  onClose,
  defaultValues,
}) => {
  const {
    hookform: { errors, register, handleSubmit, isSubmitting, watch },
    fieldArray: { fields, append, remove },
    modals: { warningModal, setWarningModal, successModal, setSuccessModal },
    handlers: { onFistJobChange, onDateChange, onFormSubmit },
  } = useProfessionalExperience(defaultValues);

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
        <Description>
          Coloque até 3 experiêcnias profissioanis que você acha relevante
        </Description>
        <CheckboxComponent
          id="first-job"
          register={register('isFirstJob', {
            onChange: e => onFistJobChange(e.target.checked),
          })}
        >
          Primeira experiência profissional
        </CheckboxComponent>
        {fields.length < 3 && (
          <AddButton
            label="+ Adicionar"
            onClick={() =>
              append({
                company: '',
                description: '',
                startDate: '',
                endDate: '',
              })
            }
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
          cancelButton={{
            labelText: 'Cancelar',
            onClick: () => setWarningModal(true),
          }}
          submitButton={{ labelText: 'Salvar', disabled: isSubmitting }}
        />
      </Form>
    </ModalBackground>
  );
};
export default EditProfessionalExperience;

import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import ModalBackground from '@/components/modals/elements/ModalBackground';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import mobileMask from '@/utils/masks/mobileMask';
import { stateNames } from '@/utils/statesNames';
import { PersonalDataSchemaType } from '@/validation/candidateRegister/PersonalDataSchema';
import { Controller } from 'react-hook-form';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import { FieldsWrapper, Form } from './styles';
import EditFormTitle from '../Elements/EditFormTitle/EditFormTitle';
import EditSubmitButton from '../Elements/EditSubmitButtons/EditSubmitButtons';
import useEditPersonalDataForm from './useEditPersonalDataForm';

interface EditPersonalDataFormProps {
  data: ICandidateDetailsResponse;
  defaultValues: PersonalDataSchemaType;
  isOpen: boolean;
  onClose: () => void;
  refetch: VoidFunction;
}

const EditPersonalDataForm: React.FC<EditPersonalDataFormProps> = ({
  defaultValues,
  isOpen,
  data,
  onClose,
  refetch,
}) => {
  const {
    cities,
    states,
    selectedState,
    hanldleClose,
    onFormSubmit,
    hookform: {
      control,
      register,
      handleSubmit,
      setValue,
      errors,
      isSubmitting,
    },
    modals: { setWarningModalOpen, warningModalOpen, successModalOpen },
  } = useEditPersonalDataForm({ defaultValues, onClose, cadidateData: data });

  if (!isOpen) return null;

  if (successModalOpen) {
    return (
      <SuccessModal
        isOpen={successModalOpen}
        title="Dados atualizados com sucesso!"
        message="As suas informações pessoais foram atualizadas com sucesso."
        buttonText="Ok"
        onClose={() => {
          hanldleClose();
          refetch();
        }}
      />
    );
  }

  if (warningModalOpen) {
    return (
      <WarningModal
        isOpen={warningModalOpen}
        title="Descartar alterações?"
        message="Tem certeza que deseja descartar as alterações feitas? As informações não salvas serão perdidas."
        cancelText="Continuar editando"
        confirmText="Descartar alterações"
        onCancel={() => setWarningModalOpen(false)}
        onConfirm={hanldleClose}
      />
    );
  }

  return (
    <ModalBackground>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <EditFormTitle title="Editar dados pessoais" />
        <FieldsWrapper>
          <UnderlinedInput
            id="name"
            labelText="Nome completo"
            placeholder="Insira seu nome"
            disabled
            register={register('name')}
            errorType={errors.name}
          />
          <UnderlinedInput
            id="phone"
            labelText="Telefone"
            placeholder="Insira seu telefone"
            register={register('phoneNumber', {
              onChange: e =>
                setValue('phoneNumber', mobileMask(e.target.value)),
            })}
            errorType={errors.phoneNumber}
          />
          <UnderlinedInput
            id="birthday"
            labelText="Data de nascimento"
            placeholder="Insira sua data de nascimento"
            register={register('birthday', {
              onChange: e => setValue('birthday', ddmmyyyyMask(e.target.value)),
            })}
            disabled
            errorType={errors.birthday}
          />
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <UnderlinedSelect
                id="state"
                enableSearch
                label="Estado"
                placeholder="Selecione seu estado"
                options={states}
                selectedOption={stateNames[field.value]}
                onChange={value => {
                  field.onChange(value);
                  setValue('city', '');
                }}
                error={errors.state}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <UnderlinedSelect
                id="city"
                label="Cidade"
                placeholder="Selecione sua cidade"
                options={cities}
                onChange={field.onChange}
                selectedOption={field.value}
                enableSearch
                disabled={!selectedState || cities.length === 0}
                error={errors.city}
              />
            )}
          />
          <UnderlinedInput
            id="linkedin"
            labelText="Linkedin"
            placeholder="Insira o link do seu perfil"
            register={register('linkedin')}
            errorType={errors.linkedin}
          />
          <UnderlinedInput
            id="github"
            labelText="Github"
            placeholder="Insira o link do seu perfil"
            register={register('github')}
            errorType={errors.github}
          />
        </FieldsWrapper>
        <EditSubmitButton
          submitButton={{
            disabled: isSubmitting,
            labelText: isSubmitting ? 'Salvando...' : 'Salvar alterações',
          }}
          cancelButton={{
            disabled: isSubmitting,
            labelText: 'Cancelar',
            onClick: () => setWarningModalOpen(true),
          }}
        />
      </Form>
    </ModalBackground>
  );
};
export default EditPersonalDataForm;

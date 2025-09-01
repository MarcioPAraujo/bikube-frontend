import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import ModalBackground from '@/components/modals/elements/ModalBackground';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { IOption } from '@/interfaces/option';
import { City, fetchCitiesByState } from '@/services/citiesAPI';
import { fetchBrazilianStates } from '@/services/statesAPI';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import mobileMask from '@/utils/masks/mobileMask';
import { stateNames } from '@/utils/statesNames';
import { PersonalDataSchema, PersonalDataSchemaType } from '@/validation/candidateRegister/PersonalDataSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FieldsWrapper, Form } from './editPersonalDataForm';
import EditFormTitle from '../Elements/EditFormTitle/EditFormTitle';
import EditSubmitButton from '../Elements/EditSubmitButtons/EditSubmitButtons';
import WarningModal from '@/components/modals/WarningModal/WarningModal';

interface EditPersonalDataFormProps {
  defaultValues: PersonalDataSchemaType;
  isOpen: boolean;
  onClose: () => void;
}

const EditPersonalDataForm: React.FC<EditPersonalDataFormProps> = ({ defaultValues, isOpen, onClose }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PersonalDataSchemaType>({
    resolver: yupResolver(PersonalDataSchema),
    mode: 'onTouched',
    defaultValues,
  });
  const [states, setStates] = useState<IOption[]>([]);
  const [cities, setCities] = useState<IOption[]>([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);

  const selectedStateWatch = watch('state');
  useEffect(() => {
    const fetchStates = async () => {
      const response = await fetchBrazilianStates();
      if (response.length > 0) {
        const statesOptions = response.map(state => ({
          label: state.nome,
          value: state.sigla,
        }));
        setStates(statesOptions);
      }
    };
    const fetchCities = async (stateUF: string) => {
      const response = await fetchCitiesByState(stateUF);
      if (response.length > 0) {
        const citiesOptions = response.map((city: City) => ({
          label: city.nome,
          value: city.nome,
        }));
        setCities(citiesOptions);
      }
    };
    fetchStates();
    if (defaultValues.state) {
      fetchCities(defaultValues.state);
    }
  }, []);
  useEffect(() => {
    if (!states || !selectedStateWatch) return;
    const fetchCities = async () => {
      const response = await fetchCitiesByState(watch('state'));
      if (response.length > 0) {
        const citiesOptions = response.map((city: City) => ({
          label: city.nome,
          value: city.nome,
        }));
        setCities(citiesOptions);
      }
    };
    fetchCities();
  }, [selectedStateWatch]);

  const onFormSubmit = (data: PersonalDataSchemaType) => {
    console.log(data);
    setSuccessModalOpen(true);
  };

  if (!isOpen) return null;

  if (successModalOpen) {
    return (
      <SuccessModal
        isOpen={successModalOpen}
        title="Dados atualizados com sucesso!"
        message="As suas informações pessoais foram atualizadas com sucesso."
        buttonText="Ok"
        onClose={() => {
          setSuccessModalOpen(false);
          reset();
          onClose();
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
        onConfirm={() => {
          setWarningModalOpen(false);
          reset();
          onClose();
        }}
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
            register={register('name')}
            errorType={errors.name}
          />
          <UnderlinedInput
            id="phone"
            labelText="Telefone"
            placeholder="Insira seu telefone"
            register={register('phoneNumber', {
              onChange: e => setValue('phoneNumber', mobileMask(e.target.value)),
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
                disabled={!selectedStateWatch || cities.length === 0}
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

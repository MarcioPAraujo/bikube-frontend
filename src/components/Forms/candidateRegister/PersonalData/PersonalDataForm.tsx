import { PersonalDataSchema, PersonalDataSchemaType } from '@/validation/candidateRegister/PersonalDataSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import FormTitle from '../FormTitle/FormTitle';
import { Content, Form } from './personalDataFormStyles';
import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import mobileMask from '@/utils/masks/mobileMask';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import { useEffect, useState } from 'react';
import { fetchBrazilianStates, IState } from '@/services/statesAPI';
import { IOption } from '@/interfaces/option';
import { City, fetchCitiesByState } from '@/services/citiesAPI';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { stateNames } from '@/utils/statesNames';

const fetchCities = async (stateUF: string): Promise<IOption[]> => {
  const response = await fetchCitiesByState(stateUF);
  if (response.length > 0) {
    const citiesOptions = response.map((city: City) => ({
      label: city.nome,
      value: city.nome,
    }));
    return citiesOptions;
  }
  return [];
};

const PersonalDataForm: React.FC = () => {
  const { step1, setStep2, step2 } = useStepsRegistration();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<PersonalDataSchemaType>({
    resolver: yupResolver(PersonalDataSchema),
    mode: 'onTouched',
  });
  const [states, setStates] = useState<IOption[]>([]);
  const [cities, setCities] = useState<IOption[]>([]);

  const [selectedState, setSelectedState] = useState<IOption>({} as IOption);
  const [selectedCity, setSelectedCity] = useState<IOption>({} as IOption);

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
    fetchStates();

    let data = step2.formData;
    if (!data) {
      const storedData = sessionStorage.getItem(SESSION_STORAGE_KEYS.step2);
      data = storedData ? JSON.parse(storedData) : null;
      if (!data) return;
    }

    setValue('name', data.name);
    setValue('phoneNumber', data.phoneNumber);
    setValue('birthday', data.birthday);
    setValue('state', data.state);
    setValue('city', data.city);
    setValue('linkedin', data.linkedin);
    setValue('github', data.github);
    const stateName = stateNames[data.state];
    if (stateName) {
      setSelectedState({ label: stateName, value: data.state });

      fetchCities(data.state).then(citiesOptions => {
        setCities(citiesOptions);
        if (data.city) {
          setSelectedCity({ label: data.city, value: data.city });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!states || !selectedState) return;
    const fetchCities = async () => {
      const response = await fetchCitiesByState(selectedState.value);
      if (response.length > 0) {
        const citiesOptions = response.map((city: City) => ({
          label: city.nome,
          value: city.nome,
        }));
        setCities(citiesOptions);
      }
    };
    fetchCities();
  }, [selectedState]);

  const storeValue = (field: keyof PersonalDataSchemaType, value: string) => {
    const values = getValues();
    const newValues = { ...values, [field]: value };
    setValue(field, value);
    setStep2(prev => ({
      ...prev,
      formData: newValues,
    }));
    sessionStorage.setItem(SESSION_STORAGE_KEYS.step2, JSON.stringify(newValues));
  };

  const handleStateChange = (option: IOption) => {
    setSelectedState(option);
    setSelectedCity({} as IOption);
    setValue('state', option.value);
    setValue('city', '');
    trigger('state');

    storeValue('state', option.value);
    storeValue('city', '');
  };
  const handleCityChange = (option: IOption) => {
    setSelectedCity(option);
    setValue('city', option.value);
    trigger('city');
    storeValue('city', option.value);
  };

  const onSubmit = (data: PersonalDataSchemaType) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle onBack={() => router.push(step1.pathname)} title="Dados pessoais" />
      <Content>
        <UnderlinedInput
          id="name"
          labelText="Nome completo"
          placeholder="Insira seu nome"
          register={register('name', {
            onChange: e => storeValue('name', e.target.value),
          })}
          errorType={errors.name}
        />
        <UnderlinedInput
          id="phone"
          labelText="Telefone"
          placeholder="Insira seu telefone"
          register={register('phoneNumber', {
            onChange: e => storeValue('phoneNumber', mobileMask(e.target.value)),
          })}
          errorType={errors.phoneNumber}
        />
        <UnderlinedInput
          id="birthday"
          labelText="Data de nascimento"
          placeholder="Insira sua data de nascimento"
          register={register('birthday', {
            onChange: e => storeValue('birthday', ddmmyyyyMask(e.target.value)),
          })}
          errorType={errors.birthday}
        />
        <UnderlinedSelect
          id="state"
          enableSearch
          label="Estado"
          placeholder="Selecione seu estado"
          options={states}
          selectedOption={selectedState}
          setSelectedOption={setSelectedState}
          onChange={handleStateChange}
          error={errors.state}
        />
        <UnderlinedSelect
          id="city"
          label="Cidade"
          placeholder="Selecione sua cidade"
          onChange={handleCityChange}
          options={cities}
          selectedOption={selectedCity}
          setSelectedOption={setSelectedCity}
          enableSearch
          disabled={!selectedState || cities.length === 0}
          error={errors.city}
        />
        <UnderlinedInput
          id="linkedin"
          labelText="Linkedin"
          placeholder="Insira o link do seu perfil"
          register={register('linkedin', {
            onChange: e => storeValue('linkedin', e.target.value),
          })}
          errorType={errors.linkedin}
        />
        <UnderlinedInput
          id="github"
          labelText="Github"
          placeholder="Insira o link do seu perfil"
          register={register('github', {
            onChange: e => storeValue('github', e.target.value),
          })}
          errorType={errors.github}
        />
      </Content>
    </Form>
  );
};
export default PersonalDataForm;

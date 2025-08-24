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
import { fetchCitiesByState } from '@/services/citiesAPI';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';

const PersonalDataForm: React.FC = () => {
  const { step1 } = useStepsRegistration();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
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
  }, []);

  useEffect(() => {
    if (!states || !selectedState) return;
    const fetchCities = async () => {
      const response = await fetchCitiesByState(selectedState.value);
      if (response.length > 0) {
        const citiesOptions = response.map((city: any) => ({
          label: city.nome,
          value: city.nome,
        }));
        setCities(citiesOptions);
      }
    };
    fetchCities();
  }, [selectedState]);

  const handleStateChange = (option: IOption) => {
    setSelectedState(option);
    setSelectedCity({} as IOption);
    setValue('state', option.value);
    setValue('city', '');
    trigger('state');
  };
  const handleCityChange = (option: IOption) => {
    setSelectedCity(option);
    setValue('city', option.value);
    trigger('city');
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
      </Content>
    </Form>
  );
};
export default PersonalDataForm;

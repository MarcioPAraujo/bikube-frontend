import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import { IOption } from '@/interfaces/option';
import { City, fetchCitiesByState } from '@/services/citiesAPI';
import { fetchBrazilianStates } from '@/services/statesAPI';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { stateNames } from '@/utils/statesNames';
import { PersonalDataSchema, PersonalDataSchemaType } from '@/validation/candidateRegister/PersonalDataSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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

const usePersonalDataForm = () => {
  const { setCurrentStep, step1, setStep2, step2, step3 } = useStepsRegistration();
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
    setCurrentStep(2);

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
    router.push(step3.pathname);
  };

  const backToPreviousStep = () => {
    router.push(step1.pathname);
  };

  const hookform = {
    register,
    handleSubmit,
    errors,
  };

  return {
    hookform,
    storeValue,
    backToPreviousStep,
    handleStateChange,
    handleCityChange,
    selectedState,
    selectedCity,
    setSelectedCity,
    setSelectedState,
    states,
    cities,
    onSubmit,
  };
};
export default usePersonalDataForm;

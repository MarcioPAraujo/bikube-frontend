import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import { ICandidateProfileEditBodyRequest } from '@/interfaces/candidate/candidateProfileEditBodyRequest';
import { IOption } from '@/interfaces/option';
import { editCandidateById } from '@/services/candidate/candidateService';
import { City, fetchCitiesByState } from '@/services/citiesAPI';
import { fetchBrazilianStates } from '@/services/statesAPI';
import { notifyError } from '@/utils/handleToast';
import {
  PersonalDataSchema,
  PersonalDataSchemaType,
} from '@/validation/candidateRegister/PersonalDataSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IHookProps {
  defaultValues: PersonalDataSchemaType;
  onClose: () => void;
  cadidateData: ICandidateDetailsResponse;
}

const useEditPersonalDataForm = ({
  defaultValues,
  cadidateData,
  onClose,
}: IHookProps) => {
  const { candidate } = useCandidateAuth();
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

  const hanldleClose = () => {
    setWarningModalOpen(false);
    setSuccessModalOpen(false);
    reset();
    onClose();
  };

  const onFormSubmit = async (data: PersonalDataSchemaType) => {
    const candidateId = candidate?.id || '0';
    const body: ICandidateProfileEditBodyRequest = {
      ...cadidateData,
      id: Number(candidateId),
      cidade: data.city,
      estado: data.state,
      telefone: data.phoneNumber,
      linkedin: data.linkedin,
      github: data.github,
    };

    const result = await editCandidateById(body);

    if (result.error) {
      notifyError(result.error);
      return;
    }

    console.log(data);
    setSuccessModalOpen(true);
  };

  const hookform = {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isSubmitting,
  };

  const modals = {
    successModalOpen,
    warningModalOpen,
    setWarningModalOpen,
  };

  return {
    hookform,
    states,
    cities,
    selectedState: selectedStateWatch,
    modals,
    hanldleClose,
    onFormSubmit,
  };
};
export default useEditPersonalDataForm;

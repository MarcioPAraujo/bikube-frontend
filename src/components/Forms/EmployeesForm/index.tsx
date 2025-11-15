import InputComponent from '@/components/Inputs/InputComponent';
import SelectComponent from '@/components/Inputs/Select/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  EmployeesFormSchema,
  EmployeesFormValues,
} from '@/validation/Employees/EmployeesForm';
import { IOption } from '@/interfaces/option';
import { getsectors } from '@/services/setor/setorService';
import { useEffect, useState } from 'react';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import cpfMask from '@/utils/masks/cpfMask';
import mobileMask from '@/utils/masks/mobileMask';
import moneyMask from '@/utils/masks/moneyMask';
import cepMask from '@/utils/masks/cepMask';
import getAddressByCep from '@/services/address';
import { useAuth } from '@/hooks/useAuth';
import { Fieldset, FormContainer, GridContainer, Legend } from './styles';

// Address interface for fetching address by CEP
interface Address {
  city: string;
  neighborhood: string;
  state: string;
  street: string;
}

interface IEmployeeFormProps {
  mode: 'create' | 'edit' | 'view';
  formId: string;
  defaultValues?: EmployeesFormValues;
  sector?: string;
  onSubmit?: (data: EmployeesFormValues) => void;
}

// Options for the position select input
const positions: IOption[] = [
  { value: 'RH', label: 'Recursos Humanos' },
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'FUNCIONARIO', label: 'Funcionário' },
];

const EmployeeForm: React.FC<IEmployeeFormProps> = ({
  mode,
  formId,
  defaultValues,
  sector,
  onSubmit = () => 0,
}) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<EmployeesFormValues>({
    resolver: yupResolver(EmployeesFormSchema),
    mode: 'onChange',
  });
  const [selectedSector, setSelectedSector] = useState<IOption>({} as IOption);
  const [selectedPosition, setSelectedPosition] = useState<IOption>(
    {} as IOption,
  );
  const [sectorsOptions, setSectorsOptions] = useState<IOption[]>([]);
  const [gettingAddress, setGettingAddress] = useState(false);

  /**
   * Initializes the form based on the mode and default values
   * - For 'create' mode, it fetches the sectors options
   * - For 'edit' or 'view' mode, it populates the form with default values
   * and fetches the sectors options
   */
  useEffect(() => {
    const initializeForm = async () => {
      if (!defaultValues) {
        // mode is 'create'
        const response = await getsectors();
        if (!response.data) return;
        const sectorsOptions: IOption[] = response.data.map(sector => ({
          value: sector.id.toString(),
          label: sector.nome,
        }));
        setSectorsOptions(sectorsOptions);
        return;
      }

      // mode is 'edit' or 'view'
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as keyof EmployeesFormValues, value);
      });

      const positionOption = positions.find(
        option => option.value === defaultValues.cargo,
      );
      if (positionOption) {
        setSelectedPosition(positionOption);
      }
      const response = await getsectors();
      if (!response.data) return;
      const sectorsOptions: IOption[] = response.data.map(sector => ({
        value: sector.id.toString(),
        label: sector.nome,
      }));
      setSectorsOptions(sectorsOptions);

      const sectorOption = sectorsOptions.find(
        option => option.value === defaultValues.numerosetor,
      );
      if (sectorOption) {
        setSelectedSector(sectorOption);
      }
    };
    initializeForm();
  }, [defaultValues]);

  const isEditMode = mode === 'edit';
  const isViewMode = mode === 'view';

  const handleSectorChange = (option: IOption) => {
    setSelectedSector(option);
    setValue('numerosetor', option.value);
    trigger('numerosetor');
  };
  const handlePositionChange = (option: IOption) => {
    setSelectedPosition(option);
    setValue('cargo', option.value);
    trigger('cargo');
  };
  const handleDateChange = (value: string, fieldName: string) => {
    const formattedValue = ddmmyyyyMask(value);
    setValue(fieldName as keyof EmployeesFormValues, formattedValue);
    trigger(fieldName as keyof EmployeesFormValues);
  };
  const handleCPFChange = (value: string) => {
    const formattedValue = cpfMask(value);
    setValue('cpf', formattedValue);
    trigger('cpf');
  };
  const handlePhoneChange = (value: string) => {
    const formattedValue = mobileMask(value);
    setValue('telefone', formattedValue);
    trigger('telefone');
  };
  const hadleBankAccountChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');
    setValue('contabancaria', onlyNumbers);
    trigger('contabancaria');
  };
  const handleWageChange = (value: string) => {
    const formattedValue = moneyMask(value);
    setValue('salario', formattedValue);
    trigger('salario');
  };

  const handleCepChange = async (cep: string) => {
    const formattedCep = cepMask(cep);
    setValue('cep', formattedCep);
    trigger('cep');
    const cleanedCep = formattedCep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
      setGettingAddress(true);
      const address: Address | null = await getAddressByCep(cleanedCep);
      if (address) {
        setValue('logradouro', address.street);
        setValue('bairro', address.neighborhood);
        setValue('cidade', address.city);
        setValue('estado', address.state);
        trigger(['logradouro', 'bairro', 'cidade', 'estado']);
        setGettingAddress(false);
      }
    } else {
      setGettingAddress(false);
      setValue('logradouro', '');
      setValue('bairro', '');
      setValue('cidade', '');
      setValue('estado', '');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} id={formId}>
      <Fieldset>
        <Legend>Dados do Funcionário</Legend>
        <GridContainer>
          <InputComponent
            id="name"
            classname="name"
            labelText="Nome"
            placeholder="Digite o nome do funcionário"
            register={register('nome')}
            errorMessage={errors.nome?.message}
            disabled={isEditMode || isViewMode}
          />
          <InputComponent
            id="birthday"
            labelText="Data de nascimento"
            placeholder="DD/MM/AAAA"
            register={register('data_nascimento', {
              onChange: e =>
                handleDateChange(e.target.value, 'data_nascimento'),
            })}
            errorMessage={errors.data_nascimento?.message}
            disabled={isEditMode || isViewMode}
          />
          <InputComponent
            id="admission-date"
            labelText="Data de admissão"
            placeholder="DD/MM/AAAA"
            register={register('dataentrada', {
              onChange: e => handleDateChange(e.target.value, 'dataentrada'),
            })}
            errorMessage={errors.dataentrada?.message}
            disabled={isEditMode || isViewMode}
          />
          <InputComponent
            id="cpf"
            labelText="CPF"
            placeholder="Digite o CPF do funcionário"
            register={register('cpf', {
              onChange: e => handleCPFChange(e.target.value),
            })}
            errorMessage={errors.cpf?.message}
            disabled={isEditMode || isViewMode}
          />
          <InputComponent
            id="email"
            labelText="E-mail"
            placeholder="Digite o e-mail do funcionário"
            register={register('email')}
            errorMessage={errors.email?.message}
            disabled={isViewMode}
          />
          <InputComponent
            id="phone"
            labelText="Telefone"
            placeholder="Digite o telefone do funcionário"
            register={register('telefone', {
              onChange: e => handlePhoneChange(e.target.value),
            })}
            errorMessage={errors.telefone?.message}
            disabled={isViewMode}
          />
          <InputComponent
            id="bank-account"
            labelText="Conta Bancária"
            placeholder="Digite a conta bancária do funcionário"
            register={register('contabancaria', {
              onChange: e => hadleBankAccountChange(e.target.value),
            })}
            errorMessage={errors.contabancaria?.message}
            disabled={isViewMode}
          />
          <InputComponent
            id="salary"
            labelText="Salário"
            placeholder="Digite o salário do funcionário"
            register={register('salario', {
              onChange: e => handleWageChange(e.target.value),
            })}
            errorMessage={errors.salario?.message}
            disabled={isViewMode}
          />
          <InputComponent
            id="function"
            labelText="Função"
            placeholder="Digite a função do funcionário"
            register={register('funcao')}
            errorMessage={errors.funcao?.message}
            disabled={isViewMode}
          />
          <SelectComponent
            id="position-select"
            fieldClassName="cargo"
            options={positions}
            selectedOption={selectedPosition}
            onChange={handlePositionChange}
            placeholder="Selecione um cargo"
            label="Cargo"
            enableSearch
            errorMessage={errors.cargo?.message}
            disabled={isEditMode || isViewMode}
          />
          {user?.role !== 'FUNCIONARIO' && (
            <SelectComponent
              id="sector-select"
              fieldClassName="setor"
              options={sectorsOptions}
              selectedOption={selectedSector}
              onChange={handleSectorChange}
              placeholder="Selecione um setor"
              label="Setor"
              enableSearch
              errorMessage={errors.numerosetor?.message}
              disabled={isViewMode}
            />
          )}
          {sector && user?.role === 'FUNCIONARIO' && (
            <InputComponent
              id="sector-view"
              classname="setor-view"
              labelText="Setor"
              placeholder="Setor do funcionário"
              defaultValue={sector}
              disabled
            />
          )}
        </GridContainer>
      </Fieldset>
      <Fieldset>
        <Legend>Endereço</Legend>
        <GridContainer>
          <InputComponent
            id="zip-code"
            labelText="CEP"
            placeholder="Digite o CEP do funcionário"
            register={register('cep', {
              onChange: e => handleCepChange(e.target.value),
            })}
            errorMessage={errors.cep?.message}
            disabled={isViewMode}
          />

          <InputComponent
            id="state"
            labelText="Estado"
            placeholder={
              gettingAddress
                ? 'Buscando estado...'
                : 'Digite o estado do funcionário'
            }
            register={register('estado')}
            errorMessage={errors.estado?.message}
            disabled={isViewMode}
          />

          <InputComponent
            id="city"
            labelText="Cidade"
            placeholder={
              gettingAddress
                ? 'Buscando cidade...'
                : 'Digite a cidade do funcionário'
            }
            register={register('cidade')}
            errorMessage={errors.cidade?.message}
            disabled={isViewMode}
          />

          <InputComponent
            id="street"
            labelText="Rua"
            placeholder={
              gettingAddress ? 'Buscando rua...' : 'Digite a rua do funcionário'
            }
            register={register('logradouro')}
            errorMessage={errors.logradouro?.message}
            disabled={isViewMode}
          />

          <InputComponent
            id="neighborhood"
            labelText="Bairro"
            placeholder={
              gettingAddress
                ? 'Buscando bairro...'
                : 'Digite o bairro do funcionário'
            }
            register={register('bairro')}
            errorMessage={errors.bairro?.message}
            disabled={isViewMode}
          />

          <InputComponent
            id="number"
            labelText="Número"
            placeholder="Digite o número da residência"
            register={register('numero')}
            errorMessage={errors.numero?.message}
            disabled={isViewMode}
          />

          <InputComponent
            id="complement"
            classname="complement"
            labelText="Complemento"
            placeholder="Digite o complemento (opcional)"
            register={register('complemento')}
            errorMessage={errors.complemento?.message}
            disabled={isViewMode}
          />
        </GridContainer>
      </Fieldset>
    </FormContainer>
  );
};
export default EmployeeForm;

import InputComponent from '@/components/Inputs/InputComponent';
import SelectComponent from '@/components/Inputs/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmployeesFormSchema, EmployeesFormValues } from '@/validation/Employees/EmployeesForm';
import { IOption } from '@/interfaces/option';
import { getsectors } from '@/services/setor/setorService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ButtonContainer, Fieldset, FormContainer, GridContainer, Legend } from './styles';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import cpfMask from '@/utils/masks/cpfMask';
import mobileMask from '@/utils/masks/mobileMask';
import moneyMask from '@/utils/masks/moneyMask';
import cepMask from '@/utils/masks/cepMask';
import getAddressByCep from '@/services/address';
import { IEmployeeBody } from '@/interfaces/funcionarios/registerEmployee';
import { notifyError } from '@/utils/handleToast';
import { createEmployee } from '@/services/funcionarios/funcionariosService';
import LoadingScreen from '@/components/LoadingScreen';
import SuccessModal from '@/components/modals/SuccessModal';
import { useRouter } from 'next/navigation';
import { format, parse } from 'date-fns';
import WarningModal from '@/components/modals/WarningModal';

interface Address {
  city: string;
  neighborhood: string;
  state: string;
  street: string;
}

const positions: IOption[] = [
  { value: 'RH', label: 'Recursos Humanos' },
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'FUNCIONARIO', label: 'Funcionário' },
];

const formatDateToISO = (dateStr: string): string => {
  // Parse the string as dd/MM/yyyy
  const parsed = parse(dateStr, 'dd/MM/yyyy', new Date());
  // Format as yyyy-MM-dd
  return format(parsed, 'yyyy-MM-dd');
};

const EmployeeForm = () => {
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
  const router = useRouter();
  const [selectedSector, setSelectedSector] = useState<IOption>({} as IOption);
  const [selectedPosition, setSelectedPosition] = useState<IOption>({} as IOption);
  const [gettingAddress, setGettingAddress] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warningModal, setWarningModal] = useState(false);

  const { data: sectors, isFetching } = useQuery({
    queryKey: ['sectors'],
    queryFn: () => getsectors(),
  });

  const sectorsOptions: IOption[] =
    sectors?.data?.map(sector => ({
      value: sector.id.toString(),
      label: sector.nome,
    })) || [];

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

  const onFormSubmit = async (data: EmployeesFormValues) => {
    setIsSubmitting(true);
    console.log('Form Data:', data);

    const employeeData: IEmployeeBody = {
      nome: data.nome,
      salario: parseFloat(data.salario.replace(/\./g, '').replace(',', '.').replace('R$', '')),
      funcao: data.funcao,
      data_nascimento: formatDateToISO(data.data_nascimento),
      cpf: data.cpf,
      email: data.email,
      cargo: data.cargo,
      contabancaria: data.contabancaria,
      dataentrada: formatDateToISO(data.dataentrada),
      cep: data.cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      numero: data.numero,
      complemento: data.complemento || '',
      numerotelefone: data.telefone,
      numerosetor: data.numerosetor,
    };
    console.log('Employee Data:', employeeData);

    const response = await createEmployee(employeeData);
    if (response.error) {
      notifyError(response.error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setSuccessModal(true);
  };

  return (
    <>
      {isSubmitting && <LoadingScreen />}
      <SuccessModal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        title="Sucesso"
        message="Funcionário cadastrado com sucesso!"
        buttonText="Continuar"
      />
      <WarningModal
        isOpen={warningModal}
        message="Você tem certeza que deseja cancelar o cadastro? Todas as informações serão perdidas."
        title="Cancelar Cadastro"
        confirmText="Sim, cancelar"
        cancelText="Não, continuar"
        onConfirm={() => {
          setWarningModal(false);
          router.push('/funcionarios');
        }}
        onCancel={() => setWarningModal(false)}
      />
      <FormContainer onSubmit={handleSubmit(onFormSubmit)}>
        <ButtonContainer>
          <DefaultButton text="Salvar Funcionário" type="submit" />
          <DefaultButton text="Cancelar" type="button" onClick={() => setWarningModal(true)} classname="bordered" />
        </ButtonContainer>
        <Fieldset>
          <Legend>Dados do Funcionário</Legend>
          <GridContainer>
            <InputComponent
              id="name"
              labelText="Nome"
              placeholder="Digite o nome do funcionário"
              fieldClassName="nome"
              register={register('nome')}
              errorMessage={errors.nome?.message}
            />
            <InputComponent
              id="birthday"
              labelText="Data de nascimento"
              placeholder="DD/MM/AAAA"
              fieldClassName="nascimento"
              register={register('data_nascimento', {
                onChange: e => handleDateChange(e.target.value, 'data_nascimento'),
              })}
              errorMessage={errors.data_nascimento?.message}
            />
            <InputComponent
              id="admission-date"
              labelText="Data de admissão"
              placeholder="DD/MM/AAAA"
              fieldClassName="admissao"
              register={register('dataentrada', {
                onChange: e => handleDateChange(e.target.value, 'dataentrada'),
              })}
              errorMessage={errors.dataentrada?.message}
            />
            <InputComponent
              id="cpf"
              labelText="CPF"
              placeholder="Digite o CPF do funcionário"
              fieldClassName="cpf"
              register={register('cpf', {
                onChange: e => handleCPFChange(e.target.value),
              })}
              errorMessage={errors.cpf?.message}
            />
            <InputComponent
              id="email"
              labelText="E-mail"
              placeholder="Digite o e-mail do funcionário"
              fieldClassName="email"
              register={register('email')}
              errorMessage={errors.email?.message}
            />
            <InputComponent
              id="phone"
              labelText="Telefone"
              placeholder="Digite o telefone do funcionário"
              fieldClassName="telefone"
              register={register('telefone', {
                onChange: e => handlePhoneChange(e.target.value),
              })}
              errorMessage={errors.telefone?.message}
            />
            <InputComponent
              id="bank-account"
              labelText="Conta Bancária"
              placeholder="Digite a conta bancária do funcionário"
              fieldClassName="contabancaria"
              register={register('contabancaria', {
                onChange: e => hadleBankAccountChange(e.target.value),
              })}
              errorMessage={errors.contabancaria?.message}
            />
            <InputComponent
              id="salary"
              labelText="Salário"
              placeholder="Digite o salário do funcionário"
              fieldClassName="salario"
              register={register('salario', {
                onChange: e => handleWageChange(e.target.value),
              })}
              errorMessage={errors.salario?.message}
            />
            <InputComponent
              id="function"
              labelText="Função"
              placeholder="Digite a função do funcionário"
              fieldClassName="funcao"
              register={register('funcao')}
              errorMessage={errors.funcao?.message}
            />
            <SelectComponent
              id="position-select"
              fieldClassName="cargo"
              options={positions}
              selectedOption={selectedPosition}
              setSelectedOption={setSelectedPosition}
              onChange={handlePositionChange}
              placeholder="Selecione um cargo"
              label="Cargo"
              enableSearch
              errorMessage={errors.cargo?.message}
            />
            <SelectComponent
              id="sector-select"
              fieldClassName="setor"
              options={sectorsOptions}
              selectedOption={selectedSector}
              setSelectedOption={setSelectedSector}
              onChange={handleSectorChange}
              placeholder="Selecione um setor"
              disabled={isFetching}
              label="Setor"
              enableSearch
              errorMessage={errors.numerosetor?.message}
            />
          </GridContainer>
        </Fieldset>
        <Fieldset>
          <Legend>Endereço</Legend>
          <GridContainer>
            <InputComponent
              id="zip-code"
              labelText="CEP"
              placeholder="Digite o CEP do funcionário"
              fieldClassName="cep"
              register={register('cep', {
                onChange: e => handleCepChange(e.target.value),
              })}
              errorMessage={errors.cep?.message}
            />

            <InputComponent
              id="state"
              labelText="Estado"
              placeholder={gettingAddress ? 'Buscando estado...' : 'Digite o estado do funcionário'}
              fieldClassName="estado"
              register={register('estado')}
              errorMessage={errors.estado?.message}
            />

            <InputComponent
              id="city"
              labelText="Cidade"
              placeholder={gettingAddress ? 'Buscando cidade...' : 'Digite a cidade do funcionário'}
              fieldClassName="cidade"
              register={register('cidade')}
              errorMessage={errors.cidade?.message}
            />

            <InputComponent
              id="street"
              labelText="Rua"
              placeholder={gettingAddress ? 'Buscando rua...' : 'Digite a rua do funcionário'}
              fieldClassName="rua"
              register={register('logradouro')}
              errorMessage={errors.logradouro?.message}
            />

            <InputComponent
              id="neighborhood"
              labelText="Bairro"
              placeholder={gettingAddress ? 'Buscando bairro...' : 'Digite o bairro do funcionário'}
              fieldClassName="bairro"
              register={register('bairro')}
              errorMessage={errors.bairro?.message}
            />

            <InputComponent
              id="number"
              labelText="Número"
              placeholder="Digite o número da residência"
              fieldClassName="numero"
              register={register('numero')}
              errorMessage={errors.numero?.message}
            />

            <InputComponent
              id="complement"
              labelText="Complemento"
              placeholder="Digite o complemento (opcional)"
              fieldClassName="complemento"
              register={register('complemento')}
              errorMessage={errors.complemento?.message}
            />
          </GridContainer>
        </Fieldset>
      </FormContainer>
    </>
  );
};
export default EmployeeForm;

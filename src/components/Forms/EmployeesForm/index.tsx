import InputComponent from '@/components/Inputs/InputComponent';
import SelectComponent from '@/components/Inputs/Select';
import { IOption } from '@/interfaces/option';
import { getsectors } from '@/services/setor/setorService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ButtonContainer, Fieldset, FormContainer, GridContainer, Legend } from './styles';
import { DefaultButton } from '@/components/Buttons/DefaultButton';

const positions: IOption[] = [
  { value: 'RH', label: 'Recursos Humanos' },
  { value: 'ADMIN', label: 'Administração' },
  { value: 'FUNCIONARIO', label: 'Funcionário' },
];

const EmployeeForm = () => {
  const [selectedSector, setSelectedSector] = useState<IOption>({} as IOption);
  const [selectedPosition, setSelectedPosition] = useState<IOption>({} as IOption);

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
  };
  const handlePositionChange = (option: IOption) => {
    setSelectedPosition(option);
  };

  return (
    <FormContainer>
      <ButtonContainer>
        <DefaultButton text="Salvar Funcionário" type="submit" />
        <DefaultButton text="Cancelar" type="button" onClick={() => window.history.back()} classname="bordered" />
      </ButtonContainer>
      <Fieldset>
        <Legend>Dados do Funcionário</Legend>
        <GridContainer>
          <InputComponent id="name" labelText="Nome" placeholder="Digite o nome do funcionário" fieldClassName="nome" />
          <InputComponent
            id="birthday"
            labelText="Data de nascimento"
            placeholder="DD/MM/AAAA"
            fieldClassName="nascimento"
          />
          <InputComponent
            id="admission-date"
            labelText="Data de admissão"
            placeholder="DD/MM/AAAA"
            fieldClassName="admissao"
          />
          <InputComponent id="cpf" labelText="CPF" placeholder="Digite o CPF do funcionário" fieldClassName="cpf" />
          <InputComponent
            id="email"
            labelText="E-mail"
            placeholder="Digite o e-mail do funcionário"
            fieldClassName="email"
          />
          <InputComponent
            id="phone"
            labelText="Telefone"
            placeholder="Digite o telefone do funcionário"
            fieldClassName="telefone"
          />
          <InputComponent
            id="bank-account"
            labelText="Conta Bancária"
            placeholder="Digite a conta bancária do funcionário"
          />
          <InputComponent
            id="salary"
            labelText="Salário"
            placeholder="Digite o salário do funcionário"
            fieldClassName="salario"
          />
          <InputComponent
            id="function"
            labelText="Função"
            placeholder="Digite a função do funcionário"
            fieldClassName="funcao"
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
          />

          <InputComponent
            id="state"
            labelText="Estado"
            placeholder="Digite o estado do funcionário"
            fieldClassName="estado"
          />

          <InputComponent
            id="city"
            labelText="Cidade"
            placeholder="Digite a cidade do funcionário"
            fieldClassName="cidade"
          />

          <InputComponent id="street" labelText="Rua" placeholder="Digite a rua do funcionário" fieldClassName="rua" />

          <InputComponent
            id="neighborhood"
            labelText="Bairro"
            placeholder="Digite o bairro do funcionário"
            fieldClassName="bairro"
          />

          <InputComponent
            id="number"
            labelText="Número"
            placeholder="Digite o número da residência"
            fieldClassName="numero"
          />

          <InputComponent
            id="complement"
            labelText="Complemento"
            placeholder="Digite o complemento (opcional)"
            fieldClassName="complemento"
          />
        </GridContainer>
      </Fieldset>
    </FormContainer>
  );
};
export default EmployeeForm;

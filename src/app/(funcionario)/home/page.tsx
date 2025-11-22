'use client';

import EmployeeForm from '@/components/Forms/EmployeesForm';
import { getEmployeeData } from '@/services/funcionarios/funcionariosService';
import formatCurrency from '@/utils/formatCurrency';
import { EmployeesFormValues } from '@/validation/Employees/EmployeesForm';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import cepMask from '@/utils/masks/cepMask';
import {
  BadgeContainer,
  SituationBadge,
  SituationGrid,
  SituationStatus,
  Title,
  ValueBadge,
} from './styles';

const HomePage: React.FC = () => {
  /**
   * Fetches the employee details using React Query
   */
  const { data, isPlaceholderData } = useQuery({
    queryKey: ['employeeDetails'],
    queryFn: () => getEmployeeData(),
  });

  /**
   * If there's no data and it's not placeholder data, return null
   * it's the first render and the data is still being fetched
   */
  if (!data && !isPlaceholderData) return null;

  /**
   * If there's still no data, or an error occurred, show a loading message
   */
  if (!data || !data.data) {
    return (
      <div>
        <h1>Detalhes do Funcionário</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  /**
   * It formats the employee data to match the EmployeesFormValues interface
   */
  const employee: EmployeesFormValues = {
    nome: data.data?.nome,
    salario: formatCurrency(data.data.salario),
    funcao: data.data.funcao,
    data_nascimento: format(data.data.data_nascimento, 'dd/MM/yyyy'),
    cpf: data.data.cpf,
    email: data.data.email,
    cargo: data.data.cargo,
    contabancaria: '00000000',
    dataentrada: format(parseISO(data.data.dataentrada), 'dd/MM/yyyy'),
    cep: cepMask(data.data.id_endereco.cep),
    logradouro: data.data.id_endereco.logradouro,
    bairro: data.data.id_endereco.bairro,
    cidade: data.data.id_endereco.cidade,
    estado: data.data.id_endereco.estado,
    numero: data.data.id_endereco.numero,
    complemento: data.data.id_endereco.complemento,
    telefone: data.data.id_telefone.numero,
    numerosetor: data.data.idsetor.id.toString(),
  };

  const { data: employeeData } = data;

  return (
    <main>
      <div>
        <Title>Minhas informações</Title>
        <SituationStatus>
          <SituationGrid>
            <BadgeContainer>
              <SituationBadge>De férias:</SituationBadge>
              <ValueBadge>{employeeData.deFerias ? 'Sim' : 'Não'}</ValueBadge>
            </BadgeContainer>
            <BadgeContainer>
              <SituationBadge>Férias vendidas:</SituationBadge>
              <ValueBadge>{employeeData.venderFerias}</ValueBadge>
            </BadgeContainer>
            <BadgeContainer>
              <SituationBadge>Saldo de férias:</SituationBadge>
              <ValueBadge>{employeeData.feriasDisponiveis}</ValueBadge>
            </BadgeContainer>
            <BadgeContainer>
              <SituationBadge>frações de férias disponíveis:</SituationBadge>
              <ValueBadge>{employeeData.fracoesDisponiveis}</ValueBadge>
            </BadgeContainer>
            <BadgeContainer>
              <SituationBadge>Saldo de atestados:</SituationBadge>
              <ValueBadge>{employeeData.saldoAtestado}</ValueBadge>
            </BadgeContainer>
          </SituationGrid>
        </SituationStatus>
      </div>
      <EmployeeForm
        formId="viewEmployeeDetailsForm"
        defaultValues={employee}
        mode="view"
        sector={employeeData.idsetor.nome}
      />
    </main>
  );
};
export default HomePage;

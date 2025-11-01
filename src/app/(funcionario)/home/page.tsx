'use client';

import EmployeeForm from '@/components/Forms/EmployeesForm';
import { useAuth } from '@/hooks/useAuth';
import { getEmployeeById } from '@/services/funcionarios/funcionariosService';
import formatCurrency from '@/utils/formatCurrency';
import { EmployeesFormValues } from '@/validation/Employees/EmployeesForm';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import cepMask from '@/utils/masks/cepMask';
import { Title } from './styles';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const id = user?.id as string;

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['employeeDetails', id],
    queryFn: () => getEmployeeById(id),
  });

  if (!data && !isPlaceholderData) return null;

  if (!data || !data.data) {
    return (
      <div>
        <h1>Detalhes do Funcionário</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  const employee: EmployeesFormValues = {
    nome: data.data?.nome,
    salario: formatCurrency(data.data.salario),
    funcao: data.data.funcao,
    data_nascimento: format(data.data.data_nascimento, 'dd/MM/yyyy'),
    cpf: data.data.cpf,
    email: data.data.email,
    cargo: data.data.cargo,
    contabancaria: data.data.contabancaria,
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

  return (
    <main>
      <Title>Minhas informações</Title>
      <EmployeeForm
        formId="viewEmployeeDetailsForm"
        defaultValues={employee}
        mode="view"
      />
    </main>
  );
};
export default HomePage;

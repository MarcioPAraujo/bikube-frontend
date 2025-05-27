'use client';

import { Table } from '@/components/Table/Index/Index';
import { getListOfEmployees } from '@/services/funcionarios/funcionariosService';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { CustomLink } from './styles';

const columns = ['Nome', 'Cargo', 'Setor', 'Função', 'Data de Admissão'];

const EmployeesPage = () => {
  const { data: employees, isFetching } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getListOfEmployees(),
  });

  if (isFetching) return null;

  if (employees?.error) {
    return (
      <div>
        <h1>Funcionários</h1>
        <p>Ocorreu um erro ao buscar a lista de funcionários</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Funcionários</h1>
      <Table.Root tableClassName="employees">
        <Table.Header columns={columns} />
        <Table.Body>
          {employees?.data?.map(employee => (
            <CustomLink
              href={`/funcionarios/detalhes/${employee.id}`}
              key={employee.id}
              style={{ textDecoration: 'none' }}
            >
              <Table.Row>
                <Table.BodyCell>{employee.nome}</Table.BodyCell>
                <Table.BodyCell>{employee.cargo}</Table.BodyCell>
                <Table.BodyCell>{employee.id_setor.nome}</Table.BodyCell>
                <Table.BodyCell>{employee.funcao}</Table.BodyCell>
                <Table.BodyCell>{format(parseISO(employee.dataentrada), 'dd/MM/yyyy')}</Table.BodyCell>
              </Table.Row>
            </CustomLink>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export default EmployeesPage;

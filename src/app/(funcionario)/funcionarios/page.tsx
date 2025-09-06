'use client';

import { employees } from '@/components/MOCK/employees';
import { Table } from '@/components/Table/Index/Index';
import { getListOfEmployees } from '@/services/funcionarios/funcionariosService';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { useRouter } from 'next/navigation';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { useEffect, useState } from 'react';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import Pagination from '@/components/Pagination/Pagination';
import { CustomLink, TopTitle } from './styles';

const columns = ['Nome', 'Cargo', 'Setor', 'Função', 'Data de Admissão'];

const EmployeesPage = () => {
  const { push } = useRouter();
  const [search, setSearch] = useState<string>('');
  const filteredSearch = employees.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase()),
  );
  const pagination = usePaginationRange(filteredSearch, DEFAULT_PAGE_SIZE);
  useEffect(() => {
    pagination.setCurrentPage(1);
  }, [search]);
  /*
  // WHEN INTEGRATES
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
  */
  return (
    <div>
      <TopTitle>
        <h1>Funcionários</h1>
        <div>
          <DefaultButton
            text="Cadastrar funcionário"
            onClick={() => push('/funcionarios/cadastrar')}
          />
          <SearchBarComponent
            value={search}
            onSearch={e => setSearch(e.target.value)}
            placeholder="Buscar funcionário"
          />
        </div>
      </TopTitle>
      <Table.Root tableClassName="employees">
        <Table.Header columns={columns} />
        <Table.Body>
          {pagination.currentRows.map(employee => (
            <CustomLink
              href={`/funcionarios/detalhes/${employee.id}`}
              key={employee.id}
            >
              <Table.Row>
                <Table.BodyCell>{employee.name}</Table.BodyCell>
                <Table.BodyCell>{employee.duty}</Table.BodyCell>
                <Table.BodyCell>{employee.sector}</Table.BodyCell>
                <Table.BodyCell>{employee.position}</Table.BodyCell>
                <Table.BodyCell>
                  {format(parseISO(employee.joined), 'dd/MM/yyyy')}
                </Table.BodyCell>
              </Table.Row>
            </CustomLink>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={pagination.currentPage}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={employees.length}
        totalPages={pagination.totalPages}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};
export default EmployeesPage;

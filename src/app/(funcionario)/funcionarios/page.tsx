'use client';

import { Table } from '@/components/Table/Index/Index';
import { getListOfEmployees } from '@/services/funcionarios/funcionariosService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { useRouter } from 'next/navigation';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { useState } from 'react';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import Pagination from '@/components/Pagination/Pagination';
import { IEmployeeResponse } from '@/interfaces/funcionarios/getListOfEmployeesResponse';
import { useAuth } from '@/hooks/useAuth';
import { CustomLink, TopTitle } from './styles';

// Table columns for the employees list
const columns = ['Nome', 'Cargo', 'Setor', 'Função', 'Data de Admissão'];

const EmployeesPage = () => {
  const { user } = useAuth();
  const { push } = useRouter();
  const [search, setSearch] = useState<string>('');

  /**
   * Fetches the list of employees using React Query
   * It filters out the logged-in user from the list
   * @returns The employees data
   */
  let employees: IEmployeeResponse[] = [];
  const { data, isPlaceholderData } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const result = await getListOfEmployees();
      if (!user?.id) return result;
      if (result.error) return result;
      // Filter out the logged-in user from the list
      if (result.data) {
        const filteredData = result.data.filter(
          employee => employee.id !== user.id,
        );
        return { ...result, data: filteredData };
      }
      return result;
    },
    select: response => response.data,
    placeholderData: keepPreviousData,
  });

  // Stores the employees data if available
  if (data) {
    employees = data;
  }

  /**
   * Filters the employees based on the search input
   * @returns Filtered employees array
   */
  const filteredSearch = employees.filter(employee =>
    employee.nome.toLowerCase().includes(search.toLowerCase()),
  );

  /**
   * Sets up pagination for the filtered employees list
   * @returns Pagination object
   */
  const pagination = usePaginationRange(filteredSearch, DEFAULT_PAGE_SIZE);

  // First render guard to handle loading state
  if (!data && !isPlaceholderData) return null;

  // Handles the loading state while fetching employees
  if (!data) {
    return (
      <div>
        <h1>Funcionários</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  // Handles the case when there are no employees registered
  if (employees.length === 0) {
    return (
      <div>
        <TopTitle>
          <h1>Funcionários</h1>
          <div>
            <DefaultButton
              text="Cadastrar funcionário"
              onClick={() => push('/funcionarios/cadastrar')}
            />
          </div>
        </TopTitle>
        <p>Nenhum funcionário cadastrado.</p>
      </div>
    );
  }

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
            onSearch={e => {
              setSearch(e.target.value);
              pagination.setCurrentPage(1);
            }}
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
                <Table.BodyCell>{employee.nome}</Table.BodyCell>
                <Table.BodyCell>{employee.funcao}</Table.BodyCell>
                <Table.BodyCell>{employee.idsetor.nome}</Table.BodyCell>
                <Table.BodyCell>{employee.cargo}</Table.BodyCell>
                <Table.BodyCell>
                  {format(parseISO(employee.dataentrada), 'dd/MM/yyyy')}
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

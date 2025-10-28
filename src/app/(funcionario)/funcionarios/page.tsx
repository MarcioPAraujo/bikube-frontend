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
import { CustomLink, TopTitle } from './styles';

const columns = ['Nome', 'Cargo', 'Setor', 'Função', 'Data de Admissão'];

const EmployeesPage = () => {
  const { push } = useRouter();
  const [search, setSearch] = useState<string>('');

  let employees: IEmployeeResponse[] = [];
  const { data, isPlaceholderData } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getListOfEmployees(),
    select: response => response.data,
    placeholderData: keepPreviousData,
  });

  if (data) {
    employees = data;
  }

  const filteredSearch = employees.filter(employee =>
    employee.nome.toLowerCase().includes(search.toLowerCase()),
  );
  const pagination = usePaginationRange(filteredSearch, DEFAULT_PAGE_SIZE);

  if (!data && !isPlaceholderData) return null;

  if (!data) {
    return (
      <div>
        <h1>Funcionários</h1>
        <p>Carregando...</p>
      </div>
    );
  }

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

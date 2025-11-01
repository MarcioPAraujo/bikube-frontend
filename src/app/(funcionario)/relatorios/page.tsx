'use client';

import DateInput from '@/components/Inputs/DateInput';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { Table } from '@/components/Table/Index/Index';
import { ILogsresponse } from '@/interfaces/logs/logsResponse';
import { getLogs } from '@/services/logs/logsService';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import { FiltersContainer, Header } from './styles';

const columns = ['Registro do funcionário', 'Descrição', 'Data'];
const ReportsPage: FC = () => {
  const [search, setSearch] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  let logs: ILogsresponse[] = [];
  const { data, isFetching } = useQuery({
    queryKey: ['reports'],
    queryFn: () => getLogs(),
  });

  if (data?.data) {
    logs = data.data;
  }
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.registro
      .toLowerCase()
      .includes(search.toLowerCase());

    const logDate = new Date(log.data);

    if (!search.trim() && startDate && endDate) {
      return startDate <= logDate && endDate >= logDate;
    }
    if (!search.trim() && startDate && !endDate) {
      return startDate <= logDate;
    }
    if (!search.trim() && !startDate && endDate) {
      return endDate >= logDate;
    }
    if (search.trim() && startDate && endDate) {
      const isInStartDateRange = startDate <= logDate;
      const isInEndDateRange = endDate >= logDate;
      return matchesSearch && isInEndDateRange && isInStartDateRange;
    }
    return matchesSearch;
  });

  const pagination = usePaginationRange(filteredLogs, DEFAULT_PAGE_SIZE);

  if (isFetching) {
    return (
      <div>
        <h1>Relatórios</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div>
        <h1>Relatórios</h1>
        <p>Nenhum relatório encontrado.</p>
        <p>Verifique se há registros de ações dos funcionários.</p>
        <p>Obrigado!</p>
      </div>
    );
  }
  return (
    <div>
      <Header>
        <h1>Relatórios</h1>
        <FiltersContainer>
          <div>
            <DateInput
              id="startDate"
              date={startDate}
              setDate={date => {
                setStartDate(date);
                pagination.setCurrentPage(1);
              }}
              label="Data de início"
              placeholder="dd/mm/aaaa"
            />
          </div>
          <div>
            <DateInput
              id="endDate"
              date={endDate}
              setDate={date => {
                setEndDate(date);
                pagination.setCurrentPage(1);
              }}
              label="Data de término"
              placeholder="dd/mm/aaaa"
            />
          </div>
          <SearchBarComponent
            placeholder="Buscar registro"
            value={search}
            onSearch={e => {
              setSearch(e.target.value);
              pagination.setCurrentPage(1);
            }}
          />
        </FiltersContainer>
      </Header>
      <Table.Root tableClassName="logs">
        <Table.Header columns={columns} />
        {pagination.currentRows.map(log => (
          <Table.Body key={log.id}>
            <Table.Row>
              <Table.BodyCell>{log.registro}</Table.BodyCell>
              <Table.BodyCell>{log.acao}</Table.BodyCell>
              <Table.BodyCell>
                {new Date(log.data).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Table.BodyCell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table.Root>
      <Pagination
        currentPage={pagination.currentPage}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={logs.length}
        totalPages={pagination.totalPages}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};
export default ReportsPage;

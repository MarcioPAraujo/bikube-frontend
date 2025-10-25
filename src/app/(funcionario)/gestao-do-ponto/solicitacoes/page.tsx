'use client';

import Pagination from '@/components/Pagination/Pagination';
import { Table } from '@/components/Table/Index/Index';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import { Status } from './styles';

const rows = Array.from({ length: 10 }, (_, index) => ({
  id: `row-${index + 1}`,
  data: '01/01/2023',
  entradaA: '08:00',
  saidaA: '12:00',
  entradaB: '13:00',
  saidaB: '17:00',
  status: index % 2 === 0,
}));
const columns = [
  'Data',
  'Entrada - A',
  'Saída - A',
  'Entrada - B',
  'Saída - B',
  'Status',
];

const RequestAdjustmentsPage: React.FC = () => {
  const pagination = usePaginationRange(rows, DEFAULT_PAGE_SIZE);
  return (
    <div>
      <Table.Root tableClassName="points-history">
        <Table.Header columns={columns} />
        <Table.Body>
          {pagination.currentRows.map(row => (
            <Table.Row key={row.id}>
              <Table.BodyCell>{row.data}</Table.BodyCell>
              <Table.BodyCell>{row.entradaA}</Table.BodyCell>
              <Table.BodyCell>{row.saidaA}</Table.BodyCell>
              <Table.BodyCell>{row.entradaB}</Table.BodyCell>
              <Table.BodyCell>{row.saidaB}</Table.BodyCell>
              <Table.BodyCell>
                <Status className={row.status ? 'approved' : 'repproved'}>
                  {row.status ? 'aprovado' : 'reprovado'}
                </Status>
              </Table.BodyCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={pagination.currentPage}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={rows.length}
        totalPages={pagination.totalPages}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};
export default RequestAdjustmentsPage;

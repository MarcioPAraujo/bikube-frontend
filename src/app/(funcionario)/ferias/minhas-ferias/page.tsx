'use client';

import { Table } from '@/components/Table/Index/Index';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import Pagination from '@/components/Pagination/Pagination';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { useState } from 'react';
import RequestVacationForm from '@/components/Forms/RequestVacationForm/RequestVacationForm';
import { PageContainer, Status } from './styles';

const vactions = Array.from({ length: 100 }).map((_, index) => ({
  id: `vacation-${index + 1}`,
  startDate: '01/01/2024',
  endDate: '15/01/2024',
  status: index % 2 === 0,
}));

const columns = ['Data Início', 'Data Fim', 'Status'];

const MyVacationsPage: React.FC = () => {
  const pagination = usePaginationRange(vactions, DEFAULT_PAGE_SIZE);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  return (
    <PageContainer>
      <RequestVacationForm
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      />

      <div>
        <DefaultButton
          type="button"
          text="Solicitar férias"
          variant="bordered"
          onClick={() => setShowRequestModal(true)}
        />
      </div>

      <Table.Root tableClassName="my-vacations">
        <Table.Header columns={columns} />
        <Table.Body>
          {pagination.currentRows.map(vacation => (
            <Table.Row key={vacation.id}>
              <Table.BodyCell>{vacation.startDate}</Table.BodyCell>
              <Table.BodyCell>{vacation.endDate}</Table.BodyCell>
              <Table.BodyCell>
                <Status className={vacation.status ? 'approved' : 'pending'}>
                  {vacation.status ? 'Aprovado' : 'Pendente'}
                </Status>
              </Table.BodyCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={vactions.length}
        totalPaginatedData={pagination.paginatedRows}
      />
    </PageContainer>
  );
};

export default MyVacationsPage;

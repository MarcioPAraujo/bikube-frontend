'use client';

import { Table } from '@/components/Table/Index/Index';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import Pagination from '@/components/Pagination/Pagination';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { useState } from 'react';
import RequestVacationForm from '@/components/Forms/RequestVacationForm/RequestVacationForm';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getEmployeeVacations } from '@/services/vacations/vacationService';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { PageContainer, Status } from './styles';

const columns = ['Data Início', 'Data Fim', 'Status'];

const MyVacationsPage: React.FC = () => {
  const { user } = useAuth();
  const { data, isPlaceholderData } = useQuery({
    queryKey: ['employee-vacations'],
    queryFn: () => getEmployeeVacations(user?.id || ''),
    placeholderData: keepPreviousData,
  });

  const vacationsList = data?.data || [];

  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const pagination = usePaginationRange(vacationsList, DEFAULT_PAGE_SIZE);

  if (!isPlaceholderData && !data) return null;

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
              <Table.BodyCell>
                {format(vacation.dataInicio, 'dd/MM/yyyy')}
              </Table.BodyCell>
              <Table.BodyCell>
                {format(vacation.dataFim, 'dd/MM/yyyy')}
              </Table.BodyCell>
              <Table.BodyCell>
                <Status className={vacation.status}>{vacation.status}</Status>
              </Table.BodyCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={vacationsList.length}
        totalPaginatedData={pagination.paginatedRows}
      />
    </PageContainer>
  );
};

export default MyVacationsPage;

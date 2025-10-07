'use client';

import SearchBarComponent from '@/components/Inputs/SearchBar';
import SelectComponent from '@/components/Inputs/Select/Select';
import { Table } from '@/components/Table/Index/Index';
import usePaginationRange from '@/hooks/usePaginationRange';
import { IOption } from '@/interfaces/option';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import AlertModal from '@/components/modals/AlertModal/AlertModal';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import {
  ApproveButton,
  Container,
  FiltersContainer,
  RejectButton,
} from './styles';

interface IVacationPerid {
  employeeId: string;
  initialDate: string;
  endDate: string;
  sector: string;
  position: string;
  employeeName: string;
}
const employeesRequests: IVacationPerid[] = Array.from({ length: 10 }).map(
  (_, index) => ({
    employeeId: `emp-${index + 1}`,
    initialDate: '10/10/2023',
    endDate: '20/10/2023',
    sector: 'Desenvolvimento',
    position: 'Desenvolvedor',
    employeeName: `Funcionário ${index + 1}`,
  }),
);

const sectorOptions: IOption[] = Array.from({ length: 5 }).map((_, index) => ({
  label: `Setor ${index + 1}`,
  value: `setor-${index + 1}`,
}));

const columns = [
  'Registro',
  'Nome',
  'Setor',
  'Cargo',
  'Data Início',
  'Data Fim',
  'Ações',
];

const VacationsRequestsPage: React.FC = () => {
  const [sector, setSector] = useState<IOption>({} as IOption);
  const [search, setSearch] = useState<string>('');
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [action, setAction] = useState<'aprovar' | 'reprovar' | null>(null);
  const filteredRequests = employeesRequests.filter(request =>
    request.employeeName.toLowerCase().includes(search.toLowerCase()),
  );
  const pagination = usePaginationRange(filteredRequests, DEFAULT_PAGE_SIZE);
  return (
    <div>
      <AlertModal
        isOpen={alertModalOpen}
        title="Atenção!"
        message={`Tem certeza que deseja ${
          action === 'aprovar' ? 'aprovar' : 'reprovar'
        } esta solicitação de férias? Esta ação não poderá ser desfeita.`}
        confirmText="Confirmar"
        cancelText="Cancelar"
        onCancel={() => setAlertModalOpen(false)}
        onConfirm={() => {
          setAlertModalOpen(false);
          setSuccessModalOpen(true);
        }}
      />
      <SuccessModal
        isOpen={successModalOpen}
        title="Sucesso!"
        message={`A solicitação de férias foi ${
          action === 'aprovar' ? 'aprovada' : 'reprovada'
        } com sucesso.`}
        buttonText="Ok"
        onClose={() => setSuccessModalOpen(false)}
      />

      <FiltersContainer>
        <SearchBarComponent
          onSearch={e => setSearch(e.target.value)}
          value={search}
          placeholder="Buscar funcionário"
        />
        <div>
          <SelectComponent
            id="sector"
            options={sectorOptions}
            selectedOption={sector}
            onChange={setSector}
            placeholder="Filtrar por setor"
          />
        </div>
      </FiltersContainer>
      <Table.Root tableClassName="vacations">
        <Table.Header columns={columns} />
        <Table.Body>
          {pagination.currentRows.map(request => (
            <Table.Row key={request.employeeId}>
              <Table.BodyCell>{request.employeeId}</Table.BodyCell>
              <Table.BodyCell>{request.employeeName}</Table.BodyCell>
              <Table.BodyCell>{request.sector}</Table.BodyCell>
              <Table.BodyCell>{request.position}</Table.BodyCell>
              <Table.BodyCell>{request.initialDate}</Table.BodyCell>
              <Table.BodyCell>{request.endDate}</Table.BodyCell>
              <Table.BodyCell>
                <Container>
                  <ApproveButton
                    type="button"
                    onClick={() => {
                      setAction('aprovar');
                      setAlertModalOpen(true);
                    }}
                  >
                    Aprovar
                  </ApproveButton>
                  <RejectButton
                    type="button"
                    onClick={() => {
                      setAction('reprovar');
                      setAlertModalOpen(true);
                    }}
                  >
                    Rejeitar
                  </RejectButton>
                </Container>
              </Table.BodyCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        totalOfData={employeesRequests.length}
        currentPage={pagination.currentPage}
        setCurrentPage={pagination.setCurrentPage}
        totalPages={pagination.totalPages}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};

export default VacationsRequestsPage;

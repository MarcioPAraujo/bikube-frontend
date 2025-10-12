'use client';

import SearchBarComponent from '@/components/Inputs/SearchBar';
import SelectComponent from '@/components/Inputs/Select/Select';
import { Table } from '@/components/Table/Index/Index';
import usePaginationRange from '@/hooks/usePaginationRange';
import { IOption } from '@/interfaces/option';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import { useRef, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import AlertModal from '@/components/modals/AlertModal/AlertModal';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  approveRefuseVacation,
  getPendingVacations,
} from '@/services/vacations/vacationService';
import { format } from 'date-fns';
import { notifyError } from '@/utils/handleToast';
import {
  ApproveButton,
  Container,
  FiltersContainer,
  RejectButton,
  SectorContainer,
} from './styles';

const sectorOptions: IOption[] = Array.from({ length: 5 }).map((_, index) => ({
  label: `Setor ${index + 1}`,
  value: `setor-${index + 1}`,
}));

const columns = ['Nome', 'Cargo', 'Setor', 'Data Início', 'Data Fim', 'Ações'];

const VacationsRequestsPage: React.FC = () => {
  const [sector, setSector] = useState<IOption>({} as IOption);
  const [search, setSearch] = useState<string>('');
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [action, setAction] = useState<'aprovado' | 'reprovado' | null>(null);
  const vacationId = useRef<number | null>(null);

  const { data, isPlaceholderData, refetch } = useQuery({
    queryKey: ['pending-vacations'],
    queryFn: () => getPendingVacations(),
    placeholderData: keepPreviousData,
  });

  const employeessList = data?.data || [];

  const filteredRequests = employeessList.filter(request => {
    const matchesSearch = request.funcionario.nome
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSector =
      !sector.label || request.funcionario.idsetor.nome === sector.label;
    return matchesSearch && matchesSector;
  });
  console.log(filteredRequests);
  const pagination = usePaginationRange(filteredRequests, DEFAULT_PAGE_SIZE);

  const updateVacationStatus = async () => {
    if (!action || !vacationId.current) return;
    const response = await approveRefuseVacation({
      idferias: vacationId.current,
      novoStatus: action,
    });
    if (response.error) {
      notifyError(response.error);
      setAlertModalOpen(false);
      return;
    }
    setAlertModalOpen(false);
    setSuccessModalOpen(true);
    refetch();
  };

  if (!isPlaceholderData && !data) return null;

  console.log(sector);

  return (
    <div>
      <AlertModal
        isOpen={alertModalOpen}
        title="Atenção!"
        message={`Tem certeza que deseja ${
          action === 'aprovado' ? 'aprovar' : 'reprovar'
        } esta solicitação de férias? Esta ação não poderá ser desfeita.`}
        confirmText="Confirmar"
        cancelText="Cancelar"
        onCancel={() => {
          setAlertModalOpen(false);
          vacationId.current = null;
          setAction(null);
        }}
        onConfirm={updateVacationStatus}
      />
      <SuccessModal
        isOpen={successModalOpen}
        title="Sucesso!"
        message={`A solicitação de férias foi ${
          action === 'aprovado' ? 'aprovada' : 'reprovada'
        } com sucesso.`}
        buttonText="Ok"
        onClose={() => {
          setSuccessModalOpen(false);
          vacationId.current = null;
          setAction(null);
        }}
      />

      <FiltersContainer>
        <SearchBarComponent
          onSearch={e => setSearch(e.target.value)}
          value={search}
          placeholder="Buscar funcionário"
        />
        <SectorContainer>
          <SelectComponent
            id="sector"
            options={sectorOptions}
            selectedOption={sector}
            onChange={setSector}
            placeholder="Filtrar por setor"
            enableSearch
          />
          <button
            type="button"
            onClick={() => {
              setSector({} as IOption);
            }}
          >
            Limpar
          </button>
        </SectorContainer>
      </FiltersContainer>
      <Table.Root tableClassName="vacations">
        <Table.Header columns={columns} />
        <Table.Body>
          {pagination.currentRows.map(request => (
            <Table.Row key={request.id}>
              <Table.BodyCell>{request.funcionario.nome}</Table.BodyCell>
              <Table.BodyCell>{request.funcionario.cargo}</Table.BodyCell>
              <Table.BodyCell>{request.setorfuncionario}</Table.BodyCell>
              <Table.BodyCell>
                {format(request.dataInicio, 'dd/MM/yyyy')}
              </Table.BodyCell>
              <Table.BodyCell>
                {format(request.dataFim, 'dd/MM/yyyy')}
              </Table.BodyCell>
              <Table.BodyCell>
                <Container>
                  <ApproveButton
                    type="button"
                    onClick={() => {
                      setAction('aprovado');
                      vacationId.current = request.id;
                      setAlertModalOpen(true);
                    }}
                  >
                    Aprovar
                  </ApproveButton>
                  <RejectButton
                    type="button"
                    onClick={() => {
                      vacationId.current = request.id;
                      setAction('reprovado');
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
        totalOfData={employeessList.length}
        currentPage={pagination.currentPage}
        setCurrentPage={pagination.setCurrentPage}
        totalPages={pagination.totalPages}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};

export default VacationsRequestsPage;

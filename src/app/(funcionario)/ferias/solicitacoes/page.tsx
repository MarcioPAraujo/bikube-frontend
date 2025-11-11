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
  getConflictVacations,
  getPendingVacations,
} from '@/services/vacations/vacationService';
import { format, parseISO } from 'date-fns';
import { notifyError } from '@/utils/handleToast';
import VacationConflictsModal from '@/components/modals/VacationConflictsModal/VacationConflictsModal';
import { IConflictVacationResponse } from '@/interfaces/vacation/conflictVacationsResponse';
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
  const [action, setAction] = useState<'aprovado' | 'reprovado' | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const vacationId = useRef<number | null>(null);
  const conflicts = useRef<IConflictVacationResponse[]>([]);
  const vacationStartDate = useRef<string>('');
  const vacationEndDate = useRef<string>('');

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
  const pagination = usePaginationRange(filteredRequests, DEFAULT_PAGE_SIZE);

  const isThereConflictInVacation = async (): Promise<boolean> => {
    if (!vacationId.current) return false;
    const response = await getConflictVacations(vacationId.current);
    if (response.error) {
      notifyError(response.error);
      return false;
    }
    if (!response.data) return false;

    conflicts.current = response.data;

    const hasConflict = response.data.length > 0;
    if (hasConflict) {
      setConflictModalOpen(true);
    }
    return hasConflict;
  };

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

  return (
    <div>
      {conflictModalOpen && (
        <VacationConflictsModal
          isOpen={conflictModalOpen}
          onClose={() => setConflictModalOpen(false)}
          onApproveAnyway={updateVacationStatus}
          conflicts={conflicts.current}
          currentVacationEndDate={parseISO(vacationEndDate.current)}
          currentVacationStartDate={parseISO(vacationStartDate.current)}
        />
      )}

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
        onConfirm={async () => {
          if (action === 'reprovado') {
            await updateVacationStatus();
            return;
          }
          const hasConflict = await isThereConflictInVacation();
          if (!hasConflict) {
            await updateVacationStatus();
          }
        }}
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
                      vacationStartDate.current = request.dataInicio;
                      vacationEndDate.current = request.dataFim;
                      console.log(
                        'start date string',
                        vacationStartDate.current,
                      );
                      console.log('end date string', vacationEndDate.current);
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

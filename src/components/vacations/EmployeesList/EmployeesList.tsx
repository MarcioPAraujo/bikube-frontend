import ModalBackground from '@/components/modals/elements/ModalBackground';
import { useEffect, useRef } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getVacationsByMonth } from '@/services/vacations/vacationService';
import { IVacationByMonthResponse } from '@/interfaces/vacation/vacationsByMonthReponse';
import RenderIf from '@/components/RenderIf/RenderIf';
import { format } from 'date-fns';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import {
  CardsContainer,
  EmployeeCard,
  EmployeeListContainer,
  MonthName,
  Title,
} from './styles';

interface IVacationPerid {
  initialDate: string;
  endDate: string;
  employeeId: number;
}

interface EmployeeVacationListProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEmployeeId: number;
  onSelectEmployee: (period: IVacationPerid) => void;
  month: number;
}

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const EmployeesList: React.FC<EmployeeVacationListProps> = ({
  onSelectEmployee,
  selectedEmployeeId,
  isOpen,
  month,
  onClose,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isEmployeeSelected = (id: number) => {
    if (id === selectedEmployeeId) {
      return 'selected';
    }
    return '';
  };

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['vacations-by-month', month],
    queryFn: () => getVacationsByMonth(month + 1),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  let employees: IVacationByMonthResponse[] = [];

  if (!isOpen) return null;
  if (!isPlaceholderData && !data) return null;

  if (data && data.data) {
    employees = data.data;
  }

  return (
    <ModalBackground>
      <EmployeeListContainer ref={listRef}>
        <Title>Funcionários</Title>
        <MonthName>mês: {monthNames[month]}</MonthName>
        <RenderIf isTrue={employees.length === 0}>
          <div>Nenhum funcionário com férias nesse mês</div>
        </RenderIf>
        <RenderIf isTrue={employees.length > 0}>
          <CardsContainer>
            {employees.map(sec => (
              <div key={sec.setor}>
                <h2>Setor: {sec.setor}</h2>
                {sec.solicitacoes.map(vocationRequest => (
                  <EmployeeCard
                    key={vocationRequest.id}
                    className={isEmployeeSelected(vocationRequest.id)}
                    onClick={() =>
                      onSelectEmployee({
                        initialDate: vocationRequest.dataInicio,
                        endDate: vocationRequest.dataFim,
                        employeeId: vocationRequest.id,
                      })
                    }
                  >
                    <strong>{vocationRequest.funcionario.nome}</strong>
                    <div>
                      Início: {format(vocationRequest.dataInicio, 'dd/MM/yyyy')}
                    </div>
                    <div>
                      Fim: {format(vocationRequest.dataFim, 'dd/MM/yyyy')}
                    </div>
                  </EmployeeCard>
                ))}
              </div>
            ))}
          </CardsContainer>
        </RenderIf>
        <DefaultButton
          type="button"
          text="Limpar"
          onClick={() => onSelectEmployee({} as IVacationPerid)}
          variant="bordered"
        />
      </EmployeeListContainer>
    </ModalBackground>
  );
};
export default EmployeesList;

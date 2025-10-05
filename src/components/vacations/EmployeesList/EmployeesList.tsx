import { format, addMonths } from 'date-fns';
import ModalBackground from '@/components/modals/elements/ModalBackground';
import { useEffect, useRef } from 'react';
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
  employeeId: string;
}

interface EmployeeVacationListProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEmployeeId: string;
  onSelectEmployee: (period: IVacationPerid) => void;
  month: string;
}

const employees = Array.from({ length: 10 }, (_, idx) => ({
  id: `emp-${idx + 1}`,
  name: `Luiz ${idx + 1}`,
  initialDate: format(new Date(), 'dd/MM/yyyy'),
  endDate: format(addMonths(new Date(), 1), 'dd/MM/yyyy'),
}));

const EmployeesList: React.FC<EmployeeVacationListProps> = ({
  onSelectEmployee,
  selectedEmployeeId,
  isOpen,
  month,
  onClose,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isEmployeeSelected = (id: string) => {
    if (id === selectedEmployeeId) {
      return 'selected';
    }
    return '';
  };

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

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <EmployeeListContainer ref={listRef}>
        <Title>Funcionários</Title>
        <MonthName>mês: {month}</MonthName>
        <CardsContainer>
          {employees.map(emp => (
            <EmployeeCard
              key={emp.id}
              className={isEmployeeSelected(emp.id)}
              onClick={() =>
                onSelectEmployee({
                  initialDate: emp.initialDate,
                  endDate: emp.endDate,
                  employeeId: emp.id,
                })
              }
            >
              <strong>{emp.name}</strong>
              <div>Início: {emp.initialDate}</div>
              <div>Fim: {emp.endDate}</div>
            </EmployeeCard>
          ))}
        </CardsContainer>
      </EmployeeListContainer>
    </ModalBackground>
  );
};
export default EmployeesList;

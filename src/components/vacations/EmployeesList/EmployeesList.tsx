import { format, addMonths } from 'date-fns';
import {
  CardsContainer,
  EmployeeCard,
  EmployeeListContainer,
  Title,
} from './styles';

interface IVacationPerid {
  initialDate: string;
  endDate: string;
  employeeId: string;
}

interface EmployeeVacationListProps {
  selectedEmployeeId: string;
  onSelectEmployee: (period: IVacationPerid) => void;
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
}) => {
  const isEmployeeSelected = (id: string) => {
    if (id === selectedEmployeeId) {
      return 'selected';
    }
    return '';
  };

  return (
    <EmployeeListContainer>
      <Title>Funcionários</Title>
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
  );
};
export default EmployeesList;

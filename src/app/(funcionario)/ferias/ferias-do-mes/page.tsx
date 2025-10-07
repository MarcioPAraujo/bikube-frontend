'use client';

import useMonthCalendar from '@/hooks/useMonthCalendar';
import { useState } from 'react';
import EmployeesList from '@/components/vacations/EmployeesList/EmployeesList';
import {
  Button,
  Calendar,
  CalendarWrapper,
  Container,
  Day,
  Header,
  ShowEmployeesButton,
  WeekDay,
  Year,
} from './styles ';

interface IVacationPerid {
  initialDate: string;
  endDate: string;
  employeeId: string;
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
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

const VacationsPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const { calendarDaysDate, handleNextMonth, handlePrevMonth, month, year } =
    useMonthCalendar(currentDate, setCurrentDate);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSelectEmployee = (period: IVacationPerid) => {
    setSelectedEmployeeId(period.employeeId);
    const startDate = period.initialDate;
    const { endDate } = period;
    const formattedStartDate = new Date(
      startDate.split('/').reverse().join('-'),
    );
    const formattedEndDate = new Date(endDate.split('/').reverse().join('-'));
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  };

  const isDateInRange = (date: Date) => {
    if (startDate && endDate) {
      const isInRange = date >= startDate && date <= endDate;
      return isInRange ? 'inRange' : '';
    }
    return '';
  };

  console.log({ startDate, endDate });

  return (
    <Container>
      <EmployeesList
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedEmployeeId={selectedEmployeeId}
        onSelectEmployee={handleSelectEmployee}
        month={monthNames[month]}
      />
      <CalendarWrapper>
        <ShowEmployeesButton type="button" onClick={() => setIsOpen(true)}>
          Ver funcionários
        </ShowEmployeesButton>
        <h1>férias</h1>
        <Header>
          <Button type="button" onClick={handlePrevMonth}>
            Mês anterior
          </Button>
          <Year>
            {monthNames[month]}/{year}
          </Year>
          <Button type="button" onClick={handleNextMonth}>
            Próximo mês
          </Button>
        </Header>
        <Calendar>
          {weekDays.map(day => (
            <WeekDay key={day}>{day}</WeekDay>
          ))}
          {calendarDaysDate.map(day => (
            <Day
              key={day.dayDate.toISOString()}
              className={isDateInRange(day.dayDate)}
            >
              {day.dayDate.getDate()}
            </Day>
          ))}
        </Calendar>
      </CalendarWrapper>
    </Container>
  );
};
export default VacationsPage;

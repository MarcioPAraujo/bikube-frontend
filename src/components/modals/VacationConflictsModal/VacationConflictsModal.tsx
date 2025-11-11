import useMonthCalendar from '@/hooks/useMonthCalendar';
import { IConflictVacationResponse } from '@/interfaces/vacation/conflictVacationsResponse';
import { useState } from 'react';
import { Icon } from '@/components/Icons/Icons';
import { format, parseISO } from 'date-fns';
import {
  Button,
  ButtonApprove,
  ButtonClose,
  ButtonsContainer,
  Calendar,
  CalendarSection,
  CalendarWrapper,
  Container,
  Day,
  EmployeesInfo,
  EmplyeeContainer,
  Header,
  InfoContainer,
  Legend,
  WeekDay,
  Year,
} from './styles';
import ModalBackground from '../elements/ModalBackground';

interface VocationConflictsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApproveAnyway: () => void;
  conflicts: IConflictVacationResponse[];
  currentVacationStartDate: Date;
  currentVacationEndDate: Date;
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

const VacationConflictsModal: React.FC<VocationConflictsModalProps> = ({
  isOpen,
  onClose,
  onApproveAnyway,
  conflicts,
  currentVacationStartDate,
  currentVacationEndDate,
}) => {
  const [calendarDate, setCalendarDate] = useState<Date | null>(
    currentVacationStartDate,
  );
  const { calendarDaysDate, handleNextMonth, handlePrevMonth, month, year } =
    useMonthCalendar(calendarDate, setCalendarDate);

  const [compareSatartDate, setCompareStartDate] = useState<Date | null>(null);
  const [compareEndDate, setCompareEndDate] = useState<Date | null>(null);

  const isDateInRange = (date: Date) => {
    let classname = '';

    let bothRanges = false;
    if (compareSatartDate && compareEndDate) {
      const isInRange = date >= compareSatartDate && date <= compareEndDate;
      bothRanges = isInRange;
      classname += isInRange ? 'compareRange ' : '';
    }

    if (currentVacationStartDate && currentVacationEndDate) {
      const isInRange =
        date >= currentVacationStartDate && date <= currentVacationEndDate;
      bothRanges = bothRanges && isInRange;
      classname += isInRange ? 'inRange ' : '';
    }

    if (bothRanges) {
      classname = 'bothRanges ';
    }

    return classname.trim();
  };

  if (!isOpen) return null;
  return (
    <ModalBackground>
      <Container>
        <InfoContainer>
          <h2>Há férias conflitantes com esse período:</h2>
          <Legend>
            <p>
              Passe o mouse sobre uma solicitação para comparar os períodos no
              calendário.
            </p>
            <ul>
              <li>
                <span />
                <span>
                  Dias em <strong>amarelo</strong> indicam o período da sua
                  solicitação atual.
                </span>
              </li>
              <li>
                <span />
                <span>
                  Dias em <strong>azul</strong> indicam o período de férias em
                  andamento de outro funcionário.
                </span>
              </li>
              <li>
                <span />
                <span>
                  Dias em <strong>vermelho</strong> indicam o período que está
                  conflitante entre as duas solicitações.
                </span>
              </li>
            </ul>
          </Legend>
          <EmplyeeContainer>
            {conflicts.map(conflict => (
              <EmployeesInfo
                key={conflict.id}
                onMouseEnter={() => {
                  setCompareStartDate(parseISO(conflict.dataInicio));
                  setCompareEndDate(parseISO(conflict.dataFim));
                }}
                onMouseLeave={() => {
                  setCompareStartDate(null);
                  setCompareEndDate(null);
                }}
              >
                <p>Funcionário: {conflict.funcionario.nome}</p>
                <p>
                  Período: {format(parseISO(conflict.dataInicio), 'dd/MM/yyyy')}{' '}
                  - &nbsp;{format(parseISO(conflict.dataFim), 'dd/MM/yyyy')}
                </p>
                <p>Status: {conflict.status}</p>
                <hr />
              </EmployeesInfo>
            ))}
          </EmplyeeContainer>
        </InfoContainer>

        <CalendarSection>
          <CalendarWrapper>
            <Header>
              <Button type="button" onClick={handlePrevMonth}>
                <Icon name="ChevronDoubleLeft" />
              </Button>
              <Year>
                {monthNames[month]}/{year}
              </Year>
              <Button type="button" onClick={handleNextMonth}>
                <Icon name="ChevronDoubleRight" />
              </Button>
            </Header>
            <Calendar>
              {weekDays.map(day => (
                <WeekDay key={day}>{day}</WeekDay>
              ))}
              {calendarDaysDate.map(day => (
                <Day
                  key={day.dayDate.toISOString()}
                  className={`${isDateInRange(day.dayDate)}`}
                >
                  {day.dayDate.getDate()}
                </Day>
              ))}
            </Calendar>
          </CalendarWrapper>

          <ButtonsContainer>
            <ButtonApprove type="button" onClick={onApproveAnyway}>
              Aprovar mesmo assim
            </ButtonApprove>
            <ButtonClose onClick={onClose} type="button">
              Fechar
            </ButtonClose>
          </ButtonsContainer>
        </CalendarSection>
      </Container>
    </ModalBackground>
  );
};
export default VacationConflictsModal;

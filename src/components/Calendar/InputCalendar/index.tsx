import { Icons } from '@/components/Icons/Icons';
import useMonthCalendar, { ICalendarDay } from '@/hooks/useMonthCalendar';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Calendar,
  CalendarHeader,
  ClearButton,
  DayButton,
  DaysContainer,
  MonthYearSelect,
  NavigationButton,
  WeekDay,
} from './styles';

interface ICalendarInputProps {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
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

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const CalendarInput: React.FC<ICalendarInputProps> = ({ date, setDate }) => {
  const { calendarDaysDate, month, year, handleNextMonth, handlePrevMonth } = useMonthCalendar(date, setDate);
  const [showMonthYearSelect, setShowMonthYearSelect] = useState(false);

  const getDayClassName = (day: ICalendarDay) => {
    let className = '';
    if (day.isToday) className += 'today ';
    if (day.dayOfWeek === 0 || day.dayOfWeek === 6) className += 'weekend ';
    if (!day.isCurrentMonth) className += 'not-current-month ';
    if (day.isSelected) className += 'selected ';
    return className.trim();
  };

  return (
    <Calendar>
      <CalendarHeader>
        <NavigationButton type="button" onClick={handlePrevMonth} accessKey="p" aria-label="Go to previous month">
          <Icons.ChevronDoubleLeft />
        </NavigationButton>
        <MonthYearSelect type="button" onClick={() => setShowMonthYearSelect(true)} aria-label="Select month and year">
          {monthNames[month]} {year} <Icons.ChevronDown size={15} />
        </MonthYearSelect>
        <NavigationButton type="button" onClick={handleNextMonth} accessKey="n" aria-label="Go to next month">
          <Icons.ChevronDoubleRight />
        </NavigationButton>
      </CalendarHeader>
      <DaysContainer>
        {weekDays.map((day, index) => (
          <WeekDay key={index} className="week-day">
            {day}
          </WeekDay>
        ))}
        {calendarDaysDate.map((day, index) => (
          <DayButton
            key={index}
            type="button"
            disabled={!day.isCurrentMonth}
            className={getDayClassName(day)}
            onClick={() => setDate(day.dayDate)}
          >
            {day.dayDate.getDate()}
          </DayButton>
        ))}
      </DaysContainer>
      <ClearButton type="button" onClick={() => setDate(null)}>
        Limpar
      </ClearButton>
    </Calendar>
  );
};
export default CalendarInput;

import { Icons } from '@/components/Icons/Icons';
import useMonthCalendar, { ICalendarDay } from '@/hooks/useMonthCalendar';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {
  Calendar,
  CalendarHeader,
  ClearButton,
  DayButton,
  DaysContainer,
  MonthYearButton,
  NavigationButton,
  WeekDay,
} from './styles';
import YearMonthSelect from '../YearMonthSelect';

interface ICalendarInputProps {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  onClose: () => void;
  onChange?: (date: Date | null) => void;
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
// TODO: add monht and year select functionality
const CalendarInput: React.FC<ICalendarInputProps> = ({ date, setDate, onChange, onClose }) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarDate, setCalendarDate] = useState<Date | null>(date);
  const { calendarDaysDate, month, year, handleNextMonth, handlePrevMonth } = useMonthCalendar(
    calendarDate,
    setCalendarDate,
  );
  const [showMonthYearSelect, setShowMonthYearSelect] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getDayClassName = (day: ICalendarDay) => {
    let className = '';
    if (day.isToday) className += 'today ';
    if (day.dayOfWeek === 0 || day.dayOfWeek === 6) className += 'weekend ';
    if (!day.isCurrentMonth) className += 'not-current-month ';
    if (day.isSelected) className += 'selected ';
    return className.trim();
  };

  if (showMonthYearSelect) {
    return (
      <YearMonthSelect
        isOpen={showMonthYearSelect}
        onClose={() => setShowMonthYearSelect(false)}
        currentDate={calendarDate}
        setDate={setDate}
      />
    );
  }

  return (
    <Calendar ref={calendarRef}>
      <CalendarHeader>
        <NavigationButton type="button" onClick={handlePrevMonth} accessKey="p" aria-label="Go to previous month">
          <Icons.ChevronDoubleLeft />
        </NavigationButton>
        <MonthYearButton type="button" onClick={() => setShowMonthYearSelect(true)} aria-label="Select month and year">
          {monthNames[month]} {year} <Icons.ChevronDown size={15} />
        </MonthYearButton>
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
            onClick={() => {
              setDate(day.dayDate);
              setCalendarDate(day.dayDate);
              if (onChange) onChange(day.dayDate);
              onClose();
            }}
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

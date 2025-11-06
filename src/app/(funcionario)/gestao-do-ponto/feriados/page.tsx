'use client';

import useMonthCalendar, { ICalendarDay } from '@/hooks/useMonthCalendar';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHolidaysOfYear } from '@/services/mirror/mirrorService';
import { format, parseISO } from 'date-fns';
import {
  Button,
  Calendar,
  CalendarWrapper,
  Container,
  Day,
  Header,
  HolidayName,
  Small,
  WeekDay,
  Year,
} from './styles';

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

const HolidaysPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const {
    calendarDaysDate,
    handleNextMonth,
    handlePrevMonth,
    month,
    year,
    handleAddyears,
    handleSubYears,
  } = useMonthCalendar(currentDate, setCurrentDate);

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['holidays', year],
    queryFn: () => getHolidaysOfYear(year),
    select: result => result.data,
  });

  const getDayClass = (dayDate: ICalendarDay) => {
    // add verification for holidays here in the future
    let classes = '';

    classes += dayDate.isCurrentMonth ? '' : ' not-current-month';
    classes += dayDate.isToday ? ' today' : '';
    if (dayDate.dayOfWeek === 0 || dayDate.dayOfWeek === 6) {
      classes += ' weekend';
    }

    const fomrattedDate = format(dayDate.dayDate, 'yyyy-MM-dd');
    if (data) {
      classes += data[fomrattedDate] ? ' holiday' : '';
    }

    return classes;
  };

  if (!isPlaceholderData && !data) return null;

  return (
    <Container>
      <CalendarWrapper>
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
          {calendarDaysDate.map(day => {
            const formattedDate = format(day.dayDate, 'yyyy-MM-dd');
            return (
              <Day key={day.dayDate.toISOString()} className={getDayClass(day)}>
                <Small>{day.dayDate.getDate()}</Small>
                {data && data[formattedDate] && (
                  <HolidayName>{data[formattedDate].name}</HolidayName>
                )}
              </Day>
            );
          })}
        </Calendar>
      </CalendarWrapper>
    </Container>
  );
};

export default HolidaysPage;

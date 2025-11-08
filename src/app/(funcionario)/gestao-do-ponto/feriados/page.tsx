'use client';

import useMonthCalendar, { ICalendarDay } from '@/hooks/useMonthCalendar';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  createHoliday,
  getHolidaysOfYear,
} from '@/services/mirror/mirrorService';
import { format, parseISO } from 'date-fns';
import { notifyError, notifySuccess } from '@/utils/handleToast';
import AlertModal from '@/components/modals/AlertModal/AlertModal';
import {
  Button,
  Calendar,
  CalendarWrapper,
  Container,
  Day,
  Header,
  HolidayButton,
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
  const { calendarDaysDate, handleNextMonth, handlePrevMonth, month, year } =
    useMonthCalendar(currentDate, setCurrentDate);
  const [warningModal, setWarningModal] = useState(false);

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
    classes += dayDate.isSelected ? ' selected' : '';
    if (dayDate.dayOfWeek === 0 || dayDate.dayOfWeek === 6) {
      classes += ' weekend';
    }

    const fomrattedDate = format(dayDate.dayDate, 'yyyy-MM-dd');
    if (data) {
      classes += data[fomrattedDate] ? ' holiday' : '';
    }

    return classes;
  };

  const markDayAsHoliday = async () => {
    if (!currentDate) return;
    const parsedDate = parseISO(format(currentDate, 'yyyy-MM-dd'));
    const isAlreadyHoliday = data && data[format(parsedDate, 'yyyy-MM-dd')];
    if (isAlreadyHoliday) {
      return;
    }
    const response = await createHoliday(currentDate);
    if (response.data) {
      notifySuccess('Feriado criado com sucesso');
    }
    if (response.error) {
      notifyError(response.error);
    }
  };

  if (!isPlaceholderData && !data) return null;

  return (
    <>
      <AlertModal
        isOpen={warningModal}
        title="Confirmar ação"
        message={`Tem certeza que deseja marcar o dia ${format(
          currentDate || new Date(),
          'dd/MM/yyyy',
        )} como feriado?\nEssa ação não pode ser desfeita.`}
        onConfirm={() => {
          markDayAsHoliday();
          setWarningModal(false);
        }}
        onCancel={() => setWarningModal(false)}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />

      <Container>
        <HolidayButton
          type="button"
          onClick={() => setWarningModal(true)}
          disabled={!currentDate}
        >
          marcar{' '}
          <strong>{format(currentDate || new Date(), 'dd/MM/yyyy')}</strong>{' '}
          como feriado
        </HolidayButton>
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
                <Day
                  key={day.dayDate.toISOString()}
                  className={getDayClass(day)}
                  onClick={() => setCurrentDate(day.dayDate)}
                >
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
    </>
  );
};

export default HolidaysPage;

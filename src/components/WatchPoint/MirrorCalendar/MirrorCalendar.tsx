import useMonthCalendar from '@/hooks/useMonthCalendar';
import {
  IEmployeeMirrorResponse,
  ListaEntrada,
} from '@/interfaces/mirror/employeeMirrorResponse';
import { getEmployeeMirrors } from '@/services/mirror/mirrorService';
import { format, parseISO } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icons/Icons';
import AbsenceJustificationModal from '@/components/modals/AbsenceJustificationModal/AbsenceJustificationModal';
import {
  Button,
  Calendar,
  CalendarSection,
  CalendarWrapper,
  CloseButton,
  Container,
  Day,
  EntriesOfDayContainer,
  Header,
  JustificationButton,
  Li,
  WeekDay,
  Year,
} from './styles';

interface MirrorCalendarProps {
  employeeId: string | null;
  onClose: () => void;
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

const MirrorCalendar: React.FC<MirrorCalendarProps> = ({
  employeeId,
  onClose,
}) => {
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const { month, handlePrevMonth, handleNextMonth, calendarDaysDate, year } =
    useMonthCalendar(currentDate, setCurrentDate);
  const [allMirrors, setAllMirrors] = useState<IEmployeeMirrorResponse[]>([]);
  const [mirrors, setMirrors] = useState<IEmployeeMirrorResponse>();
  const [entriesOfDay, setEntriesOfDay] = useState<ListaEntrada | null>(null);
  const [showInputJustification, setShowInputJustification] =
    useState<boolean>(false);
  const mirrorDayIdRef = useRef<number>(0);
  const dayRef = useRef<Date | null>(null);

  /*
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['employee-mirror', employeeId],
    queryFn: async () => {
      if (!employeeId) return null;
      const response = await getEmployeeMirrors(employeeId);
      if (!response.data) return null;

      setAllMirrors(response.data);

      const date = currentDate || new Date();

      const year = date.getFullYear();
      const month = date.getMonth();
      // get first day of month
      const formattedDate = format(new Date(year, month, 1), 'yyyy-MM-dd');

      const mirrorOfMonth = response.data.filter(
        mirror => mirror.periodoInicio === formattedDate,
      );
      if (mirrorOfMonth.length > 0) {
        setMirrors(mirrorOfMonth[0]);
      }
      return response.data;
    },
    enabled: !!employeeId,
  });
  */

  const refetchMirrors = async () => {
    if (!employeeId) return null;
    const response = await getEmployeeMirrors(employeeId);
    if (!response.data) return null;

    setAllMirrors(response.data);

    const date = currentDate || new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    // get first day of month
    const formattedDate = format(new Date(year, month, 1), 'yyyy-MM-dd');

    const mirrorOfMonth = response.data.filter(
      mirror => mirror.periodoInicio === formattedDate,
    );
    if (mirrorOfMonth.length > 0) {
      setMirrors(mirrorOfMonth[0]);
    }
    if (dayRef.current) {
      const formattedDate = format(dayRef.current, 'yyyy-MM-dd');

      const day = mirrorOfMonth[0].listaEntradas.find(
        d => d.data === formattedDate,
      );
      if (day) {
        setEntriesOfDay(day);
      }
    }
  };

  useEffect(() => {
    refetchMirrors();
  }, [employeeId]);

  const getClassname = (
    date: Date,
    dayOfWeek: number,
    isCurrentMonth: boolean,
  ) => {
    if (!mirrors) return '';

    let statusClass = '';

    const formattedDate = format(date, 'yyyy-MM-dd');

    if (!isCurrentMonth) {
      return 'notCurrentMonth';
    }

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      statusClass += 'weekend ';
    }

    const day = mirrors.listaEntradas.find(d => d.data === formattedDate);
    if (day) {
      const status = day.ausencia ? 'ausente' : 'presente';
      statusClass += status;
    }
    // future date
    if (!day) {
      statusClass += 'unavailable ';
    }
    return statusClass.trim();
  };

  const getEntriesOfDay = (date: Date) => {
    if (!mirrors) return null;

    const formattedDate = format(date, 'yyyy-MM-dd');

    const day = mirrors.listaEntradas.find(d => d.data === formattedDate);
    if (day) {
      setEntriesOfDay(day);
    }
  };

  const onMonthChange = (newMonth: Date) => {
    if (allMirrors.length === 0) return;

    const year = newMonth.getFullYear();
    const month = newMonth.getMonth();
    // get first day of month
    const formattedDate = format(new Date(year, month, 1), 'yyyy-MM-dd');

    const mirrorOfMonth = allMirrors.filter(
      mirror => mirror.periodoInicio === formattedDate,
    );
    if (mirrorOfMonth.length > 0) {
      setMirrors(mirrorOfMonth[0]);
    } else {
      setMirrors(undefined);
    }
    setEntriesOfDay(null);
  };

  if (!employeeId) {
    return (
      <Container>
        <CloseButton onClick={() => onClose()} type="button">
          X
        </CloseButton>
      </Container>
    );
  }

  return (
    <>
      <AbsenceJustificationModal
        isOpen={showInputJustification}
        onClose={() => setShowInputJustification(false)}
        dayId={mirrorDayIdRef.current}
        refetch={() => refetchMirrors()}
      />

      <Container>
        <CloseButton onClick={() => onClose()} type="button">
          X
        </CloseButton>
        <CalendarSection>
          <CalendarWrapper>
            <Header>
              <Button
                type="button"
                onClick={() => {
                  const date = handlePrevMonth();
                  onMonthChange(date);
                }}
              >
                <Icon name="ChevronDoubleLeft" />
              </Button>
              <Year>
                {monthNames[month]}/{year}
              </Year>
              <Button
                type="button"
                onClick={() => {
                  const date = handleNextMonth();
                  onMonthChange(date);
                }}
              >
                <Icon name="ChevronDoubleRight" />
              </Button>
            </Header>
            <Calendar>
              {weekDays.map(day => (
                <WeekDay key={day}>{day}</WeekDay>
              ))}
              {calendarDaysDate.map(day => (
                <Day
                  type="button"
                  key={day.dayDate.toISOString()}
                  onClick={() => {
                    getEntriesOfDay(day.dayDate);
                    dayRef.current = day.dayDate;
                  }}
                  className={getClassname(
                    day.dayDate,
                    day.dayOfWeek,
                    day.isCurrentMonth,
                  )}
                >
                  {day.dayDate.getDate()}
                </Day>
              ))}
            </Calendar>
          </CalendarWrapper>

          {entriesOfDay && (
            <EntriesOfDayContainer>
              <h3>{format(parseISO(entriesOfDay.data), 'dd/MM/yyyy')}</h3>
              {entriesOfDay.ausencia && <p>Colaborador ausente</p>}
              <ul>
                {entriesOfDay.entradas.map((entry, index) => (
                  <Li key={index}>
                    {index % 2 === 0 && (
                      <p>
                        <strong>Entrada:</strong>&nbsp;
                        <span>{entry.hora.slice(0, 8)}</span>
                      </p>
                    )}
                    {index % 2 !== 0 && (
                      <p>
                        <strong>Saída:</strong>&nbsp;
                        <span>{entry.hora.slice(0, 8)}</span>
                      </p>
                    )}
                  </Li>
                ))}
              </ul>
              {entriesOfDay.ausencia && !entriesOfDay.descricaoAbono && (
                <div>
                  <p>Motivo da ausência não justificado</p>
                  <JustificationButton
                    type="button"
                    onClick={() => {
                      setShowInputJustification(!showInputJustification);
                      mirrorDayIdRef.current = entriesOfDay.id;
                    }}
                  >
                    Lançar justificativa
                  </JustificationButton>
                </div>
              )}
              {entriesOfDay.ausencia && entriesOfDay.descricaoAbono && (
                <div>
                  <p>Justificativa: {entriesOfDay.descricaoAbono}</p>
                </div>
              )}
            </EntriesOfDayContainer>
          )}
        </CalendarSection>
      </Container>
    </>
  );
};
export default MirrorCalendar;

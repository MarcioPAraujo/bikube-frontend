import { DefaultButton } from '@/components/Buttons/DefaultButton';
import ModalBackground from '@/components/modals/elements/ModalBackground';
import {
  VacationRequestData,
  VacationRequestSchema,
} from '@/validation/VacationRequestSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { useAuth } from '@/hooks/useAuth';
import {
  IVacationBodyRequest,
  requestVacation,
} from '@/services/vacations/vacationService';
import { format } from 'date-fns';
import { notifyError } from '@/utils/handleToast';
import useMonthCalendar, { ICalendarDay } from '@/hooks/useMonthCalendar';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import {
  Button,
  ButtonsContainer,
  Calendar,
  Day,
  Header,
  VacationForm,
  WeekDay,
  Year,
} from './styles';

interface IRequestVacationFormProps {
  isOpen: boolean;
  onClose: () => void;
  refetchVacations: () => void;
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

const RequestVacationForm: React.FC<IRequestVacationFormProps> = ({
  isOpen,
  onClose,
  refetchVacations,
}) => {
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm<VacationRequestData>({
    mode: 'onTouched',
    resolver: yupResolver(VacationRequestSchema),
  });
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const {
    calendarDaysDate,
    handleNextMonth,
    handlePrevMonth,
    handleAddyears,
    handleSubYears,
    month,
    year,
  } = useMonthCalendar(currentDate, setCurrentDate);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  /**
   * Handles the submission of the vacation request form
   * Sends the request to the server and manages the response
   * @param data - The form data containing start and end dates
   */
  const onSubmit = async (data: VacationRequestData) => {
    const body: IVacationBodyRequest = {
      idfuncionario: user?.id || '',
      dataInicio: data.startDate,
      dataFim: data.endDate,
    };

    const response = await requestVacation(body);
    if (response.error) {
      notifyError(response.error);
      return;
    }
    refetchVacations();
    setSuccessModal(true);
  };

  const handleClose = () => {
    setSuccessModal(false);
    setStartDate(null);
    setEndDate(null);
    setCurrentDate(new Date());
    reset();
    onClose();
  };

  /**
   * Determines if a given date falls within the selected date range
   * It highlights the dates in the calendar accordingly
   * @param date - The date to check
   * @returns A string indicating if the date is in range
   */
  const isDateInRange = (date: ICalendarDay) => {
    let classname = '';
    const { dayDate } = date;

    const isWeekend = date.dayOfWeek === 0 || date.dayOfWeek === 6;
    const isOtherMonth = !date.isCurrentMonth;

    if (isWeekend) {
      classname += ' weekend';
    }

    if (isOtherMonth) {
      classname += ' other-month';
    }

    if (startDate && !endDate) {
      const isStartDate = dayDate.getTime() === startDate.getTime();
      classname += isStartDate ? ' inRange' : '';
      return classname;
    }
    if (!startDate || !endDate) {
      return classname;
    }
    const isInRange = dayDate >= startDate && dayDate <= endDate;
    classname += isInRange ? ' inRange' : '';

    return classname;
  };

  /**
   * Handles the logic for selecting start and end dates for the vacation request
   * Updates the form values accordingly
   * @param dayDate - The date that was clicked
   */
  const handleDayClick = (dayDate: Date) => {
    if (!startDate) {
      setStartDate(dayDate);
      const formattedDate = format(dayDate, 'yyyy-MM-dd');
      setValue('startDate', formattedDate, { shouldValidate: true });
      return;
    }
    if (!endDate) {
      const start = format(startDate, 'yyyy-MM-dd');
      const end = format(dayDate, 'yyyy-MM-dd');

      if (dayDate < startDate) {
        setEndDate(startDate);
        setStartDate(dayDate);

        setValue('startDate', end, { shouldValidate: true });
        setValue('endDate', start, { shouldValidate: true });
      } else {
        setEndDate(dayDate);
        setValue('endDate', end, { shouldValidate: true });
      }
      return;
    }
    const formattedStartDate = format(dayDate, 'yyyy-MM-dd');
    setValue('startDate', formattedStartDate, { shouldValidate: true });
    setValue('endDate', '', { shouldValidate: true });

    setStartDate(dayDate);
    setEndDate(null);
  };

  if (successModal) {
    return (
      <SuccessModal
        isOpen={successModal}
        title="Solicitação Enviada"
        message="Sua solicitação de férias foi enviada com sucesso e está pendente de aprovação."
        buttonText="Fechar"
        onClose={handleClose}
      />
    );
  }

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <VacationForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Solicitar férias</h2>
        <Header>
          <ButtonsContainer>
            <abbr title="Ano Anterior">
              <Button type="button" onClick={() => handleSubYears()}>
                <MdKeyboardDoubleArrowLeft />
              </Button>
            </abbr>
            <abbr title="Mês Anterior">
              <Button type="button" onClick={handlePrevMonth}>
                <MdKeyboardArrowLeft />
              </Button>
            </abbr>
          </ButtonsContainer>
          <Year>
            {monthNames[month]}/{year}
          </Year>
          <ButtonsContainer>
            <abbr title="Próximo Mês">
              <Button type="button" onClick={handleNextMonth}>
                <MdKeyboardArrowRight />
              </Button>
            </abbr>
            <abbr title="Próximo Ano">
              <Button type="button" onClick={() => handleAddyears()}>
                <MdKeyboardDoubleArrowRight />
              </Button>
            </abbr>
          </ButtonsContainer>
        </Header>
        <Calendar>
          {weekDays.map(day => (
            <WeekDay key={day}>{day}</WeekDay>
          ))}
          {calendarDaysDate.map(day => (
            <Day
              key={day.dayDate.toISOString()}
              className={isDateInRange(day)}
              type="button"
              onClick={() => handleDayClick(day.dayDate)}
            >
              {day.dayDate.getDate()}
            </Day>
          ))}
        </Calendar>

        <DefaultButton
          text="Soliciar"
          type="submit"
          disabled={isSubmitting || !isValid}
        />
        <DefaultButton
          text="Cancelar"
          variant="bordered"
          onClick={handleClose}
        />
      </VacationForm>
    </ModalBackground>
  );
};
export default RequestVacationForm;

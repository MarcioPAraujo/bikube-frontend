import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import {
  addMonths,
  subMonths,
  getDaysInMonth,
  startOfMonth,
  getDay,
  eachDayOfInterval,
  endOfMonth,
  subDays,
  addDays,
} from 'date-fns';

const today = new Date();

/**
 * This hook provides the days of the month based on the date passed in.
 * It calculates the previous and next month days, current month days,
 * and provides methods to navigate between months.
 *
 * To render the calendar, you should map over the `calendarDaysDate` array
 * and use the properties of each day object to display the date, style, and other attributes.
 * @param currentDate
 * @param setCurrentDate
 * @returns {{
 *   handlePrevMonth: Function to navigate to the previous month.
 *   handleNextMonth: Function to navigate to the next month.
 *   year: number — The current year.
 *   month: number — The current month (0-11).
 *   calendarDaysDate: Array of objects representing each day in the calendar grid. Each object contains:
 *     - dayDate: Date — The date object for the day.
 *     - isToday: boolean — True if the day is today.
 *     - dayOfWeek: number — The day of the week (0-6).
 *     - isSelected: boolean — True if the day is the currently selected date.
 *     - isCurrentMonth: boolean — True if the day belongs to the current month.
 * }}
 */
const useMonthCalendar = (date: Date | null, setCurrentDate: Dispatch<SetStateAction<Date | null>>) => {
  const currentDate = useMemo(() => {
    if (date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    return new Date();
  }, [date]);
  const handlePrevMonth = useCallback((): Date => {
    const prevMonth = subMonths(currentDate, 1);
    setCurrentDate(prevMonth);
    return prevMonth;
  }, [currentDate]);

  const handleNextMonth = useCallback((): Date => {
    const nextMonth = addMonths(currentDate, 1);
    setCurrentDate(nextMonth);
    return nextMonth;
  }, [currentDate, setCurrentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = useMemo(() => getDay(startOfMonth(currentDate)), [currentDate]);
  const daysInCurrentMonth = useMemo(() => getDaysInMonth(currentDate), [currentDate]);
  const currentMonthDays = useMemo(
    () => Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1),
    [daysInCurrentMonth],
  );

  const previousMonthDays = useMemo(() => {
    if (firstDayOfMonth === 0) {
      // Month starts on Sunday, no previous month days needed
      return [];
    }
    return eachDayOfInterval({
      start: subDays(startOfMonth(currentDate), firstDayOfMonth),
      end: subDays(startOfMonth(currentDate), 1),
    }).map(date => date.getDate());
  }, [currentDate, firstDayOfMonth]);

  const totalDays = previousMonthDays.length + currentMonthDays.length;

  const nextMonthDays = useMemo(() => {
    if (totalDays % 7 === 0) {
      return [];
    }
    return eachDayOfInterval({
      start: addDays(endOfMonth(currentDate), 1),
      end: addDays(endOfMonth(currentDate), 7 - (totalDays % 7)),
    }).map(date => date.getDate());
  }, [currentDate, totalDays]);

  const calendarDays = useMemo(
    () => [...previousMonthDays, ...currentMonthDays, ...nextMonthDays],
    [previousMonthDays, currentMonthDays, nextMonthDays],
  );

  // day properties and class names from the month calendar
  const isDayInCurrentMonth = useCallback(
    (index: number) => index >= previousMonthDays.length && index < previousMonthDays.length + currentMonthDays.length,
    [previousMonthDays.length, currentMonthDays.length],
  );
  const getMonthOffset = useCallback(
    (index: number) => {
      const isCurrentMonth = isDayInCurrentMonth(index);
      return isCurrentMonth ? 0 : index < previousMonthDays.length ? -1 : 1;
    },
    [isDayInCurrentMonth, previousMonthDays.length],
  );
  const getDayDate = useCallback(
    (day: number, index: number): Date => {
      const monthOffset = getMonthOffset(index);
      return new Date(year, month + monthOffset, day);
    },
    [isDayInCurrentMonth, previousMonthDays.length, year, month],
  );

  const getDayProperties = useCallback(
    (day: number, index: number) => {
      const isCurrentMonth = isDayInCurrentMonth(index);
      const dayDate = getDayDate(day, index);
      const isToday = dayDate.toDateString() === today.toDateString();
      const isSelected = dayDate.toDateString() === currentDate.toDateString();
      const dayOfWeek = dayDate.getDay();
      return {
        dayDate,
        isToday,
        dayOfWeek,
        isSelected,
        isCurrentMonth,
      };
    },
    [previousMonthDays.length, currentMonthDays.length, year, month, currentDate],
  );

  const calendarDaysDate: ICalendarDay[] = useMemo(() => {
    return calendarDays.map((day, index) => {
      const dayDate = getDayProperties(day, index);
      return dayDate;
    });
  }, [calendarDays, getDayProperties]);

  return {
    handlePrevMonth,
    handleNextMonth,
    calendarDaysDate,
    year,
    month,
  };
};
export default useMonthCalendar;
export interface ICalendarDay {
  dayDate: Date;
  isToday: boolean;
  dayOfWeek: number;
  isSelected: boolean;
  isCurrentMonth: boolean;
}

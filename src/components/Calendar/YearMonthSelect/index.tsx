import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Backbutton, Button, Container, Header, ScrollContainer, SelectsContainer } from './styles';
import { Icons } from '@/components/Icons/Icons';
import { date } from 'yup';

interface ICalendarInputProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: Date | null;
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

const MAX_YEARS = 20; // Number of years to show in the select

const YearMonthSelect: React.FC<ICalendarInputProps> = ({ currentDate, isOpen, onClose, setDate }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    currentDate ? currentDate.getFullYear() : undefined,
  );
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    currentDate ? currentDate.getMonth() + 1 : undefined,
  );

  const [years, setYears] = useState<number[]>([]);
  const yearScrollRef = useRef<HTMLDivElement>(null);
  const hasScrolledToYear = useRef(false);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 20; // 10 years ago
    const endYear = currentYear + 20; // 10 years in the future
    const yearRange = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    setYears(yearRange);
  }, []);
  useEffect(() => {
    if (hasScrolledToYear.current) return;
    if (!yearScrollRef.current) return;

    const currentYear = selectedYear ?? new Date().getFullYear();
    const index = years.indexOf(currentYear);

    if (index !== -1) {
      // Assuming each button has a fixed height (e.g., 42px), adjust if needed
      const buttonHeight = 36;
      yearScrollRef.current.scrollTop =
        index * buttonHeight - yearScrollRef.current.clientHeight / 2 + buttonHeight / 2;

      hasScrolledToYear.current = true;
    }
  }, [isOpen, selectedYear, years]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        onClose();
        hasScrolledToYear.current = false;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
    hasScrolledToYear.current = false;
  };

  // Handle infinite scroll for years
  const handleYearScroll = () => {
    const container = yearScrollRef.current;
    if (!container) return;

    // Check if user is at the start
    if (container.scrollTop === 0) {
      const firstYear = years[0];
      const newYears = Array.from({ length: 20 }, (_, i) => firstYear - 20 + i);
      const updatedYears = [...newYears, ...years];
      const newList = updatedYears.length > MAX_YEARS ? updatedYears.slice(0, MAX_YEARS) : updatedYears;
      setYears(updatedYears);

      // Maintain scroll position after prepending
      setTimeout(() => {
        container.scrollTop = (container.scrollHeight / (years.length + 20)) * 21;
      }, 0);
      return;
    }

    // Check if user is at the end
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
      const lastYear = years[years.length - 1];
      const newYears = Array.from({ length: 20 }, (_, i) => lastYear + i + 1);
      const updatedYears = [...years, ...newYears];
      setYears(updatedYears);
    }
  };

  const handleSetSelectedDate = () => {
    if (!selectedYear || !selectedMonth) return;
    const newDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, 1);
    setDate(newDate);
    onClose();
  };

  if (!isOpen) return null;

  console.log(hasScrolledToYear.current);
  return (
    <Container ref={selectRef}>
      <Header>
        <Backbutton type="button" onClick={handleClose}>
          <Icons.ArrowLeft color="white" />
        </Backbutton>
        <button type="button" onClick={handleSetSelectedDate} disabled={!selectedYear || !selectedMonth}>
          {(!selectedMonth || !selectedYear) && 'Selecionar mês e ano'}
          {selectedMonth && selectedYear && `${monthNames[selectedMonth - 1]} de ${selectedYear}`}
        </button>
      </Header>
      <SelectsContainer>
        <ScrollContainer>
          {monthNames.map((month, index) => (
            <Button
              key={index}
              id={month}
              type="button"
              className={selectedMonth === index + 1 ? 'selected' : ''}
              onClick={() => setSelectedMonth(index + 1)}
            >
              {month}
            </Button>
          ))}
        </ScrollContainer>
        <ScrollContainer ref={yearScrollRef} onScroll={handleYearScroll}>
          {years.map((year, index) => (
            <Button
              key={`${year}${index}`}
              id={String(year)}
              type="button"
              className={selectedYear === year ? 'selected' : ''}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </Button>
          ))}
        </ScrollContainer>
      </SelectsContainer>
    </Container>
  );
};
export default YearMonthSelect;

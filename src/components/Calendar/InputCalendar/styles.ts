import styled from "styled-components";

export const Calendar = styled.div`
  position: absolute;
  bottom: -40rem;
  height: 40rem;
  width: 32rem;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  border-radius: 0.8rem;
  padding: 1.6rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 1000;
`;
export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavigationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  display: grid;
  place-items: center;

  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;
export const MonthYearButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  background-color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 0.8rem;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};

  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
    color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  }
`;

export const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: auto;
`;
export const WeekDay = styled.span`
  color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  font-weight: 600;
  text-align: center;
`;
export const DayButton = styled.button`
  aspect-ratio: 1;
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: transparent;
  border: none;

      border-radius: 0.5rem;

  &:not(.not-current-month) {
    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
    }
  }

  &.weekend {
    color: ${({ theme }) => theme.colors.RED.dark};
  }

  &.selected {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
    color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  }

  &:disabled {
    cursor: default;
    filter: brightness(0.5);
  }
`;
export const ClearButton = styled.button`
  align-self: start;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  cursor: pointer;
  padding: 0 1rem;
  border-radius: 0.8rem;

  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
    color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  }
`;

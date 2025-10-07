import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 2.4rem;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 1;
`;
export const ShowEmployeesButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  color: ${({ theme }) => theme.colors.BLACK};
  padding: 1rem;
  width: fit-content;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Year = styled.span`
  font-size: 1.6rem;
`;
export const Button = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  color: ${({ theme }) => theme.colors.BLACK};
  padding: 1rem;

  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;
export const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: auto;
`;
export const WeekDay = styled.span`
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  font-weight: 600;
  text-align: center;
  font-size: 1.6rem;
`;
export const Day = styled.div`
  aspect-ratio: 2/1.75;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border: solid 1px ${({ theme }) => theme.colors.WHITE};
  font-size: 1.6rem;

  &.inRange {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    color: ${({ theme }) => theme.colors.YELLOW.hex_9E4A00};
  }
`;

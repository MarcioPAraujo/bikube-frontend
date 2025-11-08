import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  width: clamp(50rem, 90%, 100rem);
  margin: 2rem auto 0rem auto;
`;

export const HolidayButton = styled.button`
  align-self: flex-start;
  border: none;
  background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  color: ${({ theme }) => theme.colors.BLACK};
  padding: 1rem 2rem;

  width: fit-content;

  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 1;
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
  position: relative;
  aspect-ratio: 2/1.75;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border: solid 1px ${({ theme }) => theme.colors.WHITE};
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &.today {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    color: ${({ theme }) => theme.colors.YELLOW.hex_9E4A00};
  }
  &.selected {
    border: 2px solid ${({ theme }) => theme.colors.BLUE.normal};
  }
  &.not-current-month {
    opacity: 0.4;
  }
  &.weekend,
  &.holiday {
    color: ${({ theme }) => theme.colors.RED.hex_D32F2F};
    background-color: ${({ theme }) => theme.colors.RED.hex_FFEBEE};
  }
`;

export const Small = styled.small`
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
`;

export const HolidayName = styled.span`
  text-align: center;
  padding: 0 1rem;
  margin: auto;
`;

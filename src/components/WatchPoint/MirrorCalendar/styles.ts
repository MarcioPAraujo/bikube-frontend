import styled from 'styled-components';

export const Container = styled.div`
  border: solid 1px ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  margin-bottom: 1.6rem;
  padding: 0.4rem 0.8rem;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  border-radius: 0.4rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.RED.hex_FFB4B4};
  }
`;

export const CalendarSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
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

  display: grid;
  place-items: center;
  padding: 0.4rem;

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
export const Day = styled.button`
  aspect-ratio: 2/1.75;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border: solid 1px ${({ theme }) => theme.colors.WHITE};
  font-size: 1.6rem;

  transition: all 0.3s ease;
  &:not(.unavailable) {
    &:hover {
      scale: 1.25;
    }
  }

  &.notCurrentMonth {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_919191};
    color: ${({ theme }) => theme.colors.GRAY.hex_353535};
    &:hover {
      scale: none;
      cursor: default;
    }
  }

  &.unavailable {
    cursor: not-allowed;
    opacity: 0.5;
    &:hover {
      scale: none;
    }
  }

  &.ausente {
    background-color: ${({ theme }) => theme.colors.RED.hex_FFB4B4};
    color: ${({ theme }) => theme.colors.RED.hex_B9375D};
  }
  &.presente {
    background-color: ${({ theme }) => theme.colors.GREEN.hex_A3DC9A};
    color: ${({ theme }) => theme.colors.GREEN.hex_4A9782};
  }
`;

export const EntriesOfDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h3 {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  }
  & > p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  }
`;

export const Li = styled.li`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  margin-bottom: 0.4rem;

  p {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  }
`;

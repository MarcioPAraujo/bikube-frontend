import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  gap: 1.6rem;
  background-color: ${({ theme }) => theme.colors.WHITE};

  padding: 2.4rem;
  border-radius: 0.8rem;
  aspect-ratio: 16/9;
`;

export const InfoContainer = styled.div`
  flex: 1;
`;
export const CalendarSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Legend = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};

  ul {
    margin-top: 0.8rem;
    list-style-type: disc;
    padding-left: 1.6rem;
  }

  li {
    margin-bottom: 0.4rem;
  }
`;

export const EmplyeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1.6rem;
  aspect-ratio: 3/2;
  overflow-y: auto;
`;

export const EmployeesInfo = styled.div`
  font-size: 1.4rem;
  cursor: copy;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_f2f2f2};
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
  &.bothRanges {
    background-color: ${({ theme }) => theme.colors.RED.hex_EB5757};
    color: ${({ theme }) => theme.colors.RED.hex_B9375D};
  }
  &.compareRange {
    background-color: ${({ theme }) => theme.colors.BLUE.normal};
    color: ${({ theme }) => theme.colors.BLUE.dark};
  }
`;
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  width: 100%;
`;
export const ButtonApprove = styled.button`
  flex: 1;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.GREEN.hex_4A9782};
  color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;

  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GREEN.hex_78C841};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.GREEN.hex_A3DC9A};
  }
`;
export const ButtonClose = styled.button`
  flex: 1;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;

  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_f2f2f2};
  }
`;

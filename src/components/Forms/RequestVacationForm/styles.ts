import styled from 'styled-components';

export const VacationForm = styled.form`
  background-color: #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 10;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;
export const Year = styled.span`
  font-size: 1.6rem;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
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
export const Day = styled.button`
  aspect-ratio: 2/1.75;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border: solid 1px ${({ theme }) => theme.colors.WHITE};
  font-size: 1.6rem;

  &.weekend {
    color: ${({ theme }) => theme.colors.RED.hex_EB5757};
  }
  &.inRange {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    color: ${({ theme }) => theme.colors.YELLOW.hex_9E4A00};
  }
`;

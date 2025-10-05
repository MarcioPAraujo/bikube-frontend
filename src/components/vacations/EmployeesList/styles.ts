import styled from 'styled-components';

export const EmployeeListContainer = styled.div`
  position: fixed;
  z-index: 10;
  flex: 0.25;
  padding: 1.6rem;
  width: clamp(20rem, 25%, 30rem);
  left: 0;
  top: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.GRAY.hex_696969};
  font-size: 2.4rem;
`;
export const MonthName = styled.span`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
`;
export const CardsContainer = styled.div`
  display: grid;
  gap: 0.8rem;
  height: calc(100vh - 9.5rem);
  margin-top: 1.6rem;
  overflow-y: auto;
`;
export const EmployeeCard = styled.div`
  font-size: 1.6rem;
  padding: 1.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_696969};

  margin-right: 0.5rem;

  &.selected {
    border: 1px solid ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;

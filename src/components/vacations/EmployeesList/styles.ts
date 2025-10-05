import styled from 'styled-components';

export const EmployeeListContainer = styled.div`
  flex: 0.25;
  padding: 1.6rem;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.GRAY.hex_696969};
  font-size: 2.4rem;
`;
export const CardsContainer = styled.div`
  display: grid;
  gap: 0.8rem;
  aspect-ratio: 1/2.76;
  overflow-y: scroll;
`;
export const EmployeeCard = styled.div`
  font-size: 1.6rem;
  padding: 1.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_696969};

  aspect-ratio: 3/1;
  margin-right: 0.5rem;

  &.selected {
    border: 1px solid ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;

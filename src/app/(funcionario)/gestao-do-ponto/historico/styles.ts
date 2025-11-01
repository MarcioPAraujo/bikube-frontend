import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: self-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: end;
  width: 70rem;
`;

export const FilterButton = styled.button`
  background: transparent;
  border: solid 1px ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  margin-bottom: 0.35rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

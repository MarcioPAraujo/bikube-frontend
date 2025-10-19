import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: self-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const DetailsButton = styled.button`
  background: transparent;
  border: solid 1px ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
`;

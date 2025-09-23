import styled from 'styled-components';

export const Button = styled.button`
  height: 3.6rem;
  padding: 0 1rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_454545};
  background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 0.4rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_454545};
    color: ${({ theme }) => theme.colors.WHITE};
  }
`;

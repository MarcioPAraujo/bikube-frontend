import styled from 'styled-components';

export const Button = styled.button`
  width: fit-content;
  background: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  padding: 0.4rem 1rem;
  border: none;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.4rem;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.GRAY.hex_f2f2f2};
    color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    cursor: not-allowed;
  }
`;

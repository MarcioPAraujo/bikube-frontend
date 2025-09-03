import styled from 'styled-components';

export const Button = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  background: none;
  border: none;
  border-radius: 50%;

  display: grid;
  place-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.RED.hex_FFEBEE};
    svg path {
      fill: ${({ theme }) => theme.colors.RED.hex_D32F2F};
    }
  }

  &:disabled {
    cursor: not-allowed;
    svg path {
      fill: ${({ theme }) => theme.colors.GRAY.hex_A2A2A2};
    }
  }
`;

import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 4rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};

  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.3);
  }
  &:active {
    transition: 0.2s;
    box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.3);
  }

  &.bordered {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_353535};
    color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      box-shadow: none;
    }
    &:active {
      box-shadow: none;
    }
  }
`;

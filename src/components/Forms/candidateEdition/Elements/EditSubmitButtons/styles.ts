import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.8rem;
  margin-top: auto;
`;

export const SubmitButton = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  border: none;
  padding: 0.8rem 1.6rem;

  transition: background-color 0.3s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};

    box-shadow: 0 4px 8px rgba(255, 185, 54, 0.2);
  }
`;
export const CancelButton = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_353535};
  padding: 0.8rem 1.6rem;

  transition: color 0.3s ease, border-color 0.3s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    border-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    box-shadow: 0 4px 8px rgba(255, 185, 54, 0.2);
  }
`;

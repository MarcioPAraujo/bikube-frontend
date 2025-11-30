import styled from 'styled-components';

export const WatchContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 3rem;
`;
export const TimeDisplay = styled.p`
  font-size: 5rem;
  font-weight: bold;
`;
export const SaveButton = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  }

  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    color: #000;
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
  }
`;

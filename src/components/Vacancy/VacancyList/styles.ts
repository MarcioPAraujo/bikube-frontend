import styled from 'styled-components';

export const VacancyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  overflow-y: auto;
  height: calc(100vh - 15.5rem);
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
  }
`;

export const HistoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  padding: 0.5rem 0.8rem;
  font-size: 1.6rem;

  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
    scale: 1.05;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  &:active {
    scale: 0.95;
    box-shadow: none;
  }
`;
export const EmptyState = styled.div`
  margin-top: 2rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_747474};
`;

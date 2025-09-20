import styled from 'styled-components';

export const VacancyItemContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: 1rem;

  &.selected {
    border: 2px solid ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
  }
`;

export const VacancyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

export const Description = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_696969};

  span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.BLACK};
  }
`;

export const DetailsButton = styled.button`
  align-self: flex-start;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  color: ${({ theme }) => theme.colors.GRAY.hex_696969};
  padding: 0.5rem 1rem;
  font-size: 1.4rem;

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

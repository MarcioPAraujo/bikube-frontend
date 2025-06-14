import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-top: 1.8rem;
`;
export const PaginationText = styled.span`
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  font-size: 1.6rem;
`;

export const NaviagtionButton = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;
export const PageNumber = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  border-radius: 0.625rem;
  border: none;
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1.6rem;
  &: disabled {
    cursor: default;
  }

  &.current {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
    color: ${({ theme }) => theme.colors.BLACK};
  }
`;
export const Ellipsis = styled.span`
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  font-size: 1.6rem;
`;

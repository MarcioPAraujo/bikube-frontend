import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: self-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: end;
  width: fit-content;
`;

export const FilterButton = styled.button`
  background: transparent;
  border: solid 1px ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  margin-bottom: 0.35rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DownloadButton = styled.button`
  background: ${({ theme }) => theme.colors.BLUE.darker};
  border: none;
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  margin-bottom: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.4rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
`;
export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  border-radius: 0.8rem;
  font-size: 1.6rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    font-size: 1.6rem;
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    cursor: not-allowed;
  }
`;

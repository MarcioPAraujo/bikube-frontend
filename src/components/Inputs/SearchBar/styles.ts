import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 4.5rem;
  width: 35rem;
  border: solid 1px ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 0rem 0.8rem;
`;

export const Input = styled.input`
  border: none;
  background-color: ${({ theme }) => theme.colors.WHITE};
  heigth: 100%;
  width: 95%;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  }
`;

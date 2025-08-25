import styled from 'styled-components';

export const Label = styled.label`
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  color: ${({ theme }) => theme.colors.GRAY.hex_747474};
`;
export const Input = styled.input`
  cursor: pointer;
  appearance: none;
  width: 24px;
  height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_454545};
  border-radius: 50%;

  transition: all 0.2s ease-in-out;
  &:checked {
    transition: all 0.2s ease-in-out;
    background-color: ${({ theme }) => theme.colors.WHITE};
    border: 4px solid ${({ theme }) => theme.colors.YELLOW.hex_9E4A00};
  }
`;

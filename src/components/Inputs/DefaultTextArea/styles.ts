import styled from 'styled-components';

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

export const TextArea = styled.textarea`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  padding: 1rem;
  resize: none;

  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    font-weight: 400;
    font-size: 1.6rem;
  }
`;

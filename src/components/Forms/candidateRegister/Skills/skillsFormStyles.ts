import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Content = styled.div`
  align-self: center;
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  width: clamp(30rem, 100%, 70rem);
  gap: 3.6rem;
  padding-bottom: 2.4rem;
`;

export const Description = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;

export const FieldWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: end;
`;
export const AddButton = styled.button`
  width: fit-content;
  height: fit-content;
  background: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  border: none;
  padding: 0.4rem 1rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.GRAY.hex_f2f2f2};
    color: ${({ theme }) => theme.colors.GRAY.hex_353535};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const RemoveButton = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  background: none;
  border: none;
  border-radius: 50%;

  display: grid;
  place-items: center;
  align-self: flex-end;

  &:hover {
    background-color: ${({ theme }) => theme.colors.RED.hex_FFEBEE};
    svg path {
      fill: ${({ theme }) => theme.colors.RED.hex_D32F2F};
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    &:hover {
      background-color: transparent;
      svg path {
        fill: ${({ theme }) => theme.colors.GRAY.hex_747474};
      }
    }
  }
`;

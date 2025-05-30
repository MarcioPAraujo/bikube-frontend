import styled from "styled-components";

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
`;
export const ErrorMessage = styled.span`
  position: absolute;
  bottom: -1.5rem;
  color: ${({ theme }) => theme.colors.RED.normal};
  font-size: 1.4rem;
`;

import styled from "styled-components";

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 36.8rem;
    margin-bottom: 2.4rem;
`;
export const Label = styled.label`
    color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    font-size: 1.6rem;
`;
export const InputContainer = styled.div`
  border: none;
  font-size: 1.6rem;
  width: 100%;
  height: 4.8rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding-right: 1.6rem;
`;
export const Input = styled.input`
    border: none;
    background-color: transparent;
    font-size: 1.6rem;
    width: 80%;
    height: 4.8rem;
    border: none;
    border-radius: 0.8rem;
    padding: 0rem 1.6rem;
    &::placeholder {
        color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
    }
    &:focus {
        outline: none;
    }
`;
export const ErrorMessage = styled.span`
    position: absolute;
    color: ${({ theme }) => theme.colors.RED.normal};
    font-size: 1.4rem;
    bottom: -2rem;
`;

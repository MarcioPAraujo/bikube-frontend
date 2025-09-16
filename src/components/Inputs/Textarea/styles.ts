import styled from 'styled-components';

export const FieldContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
`;
export const TextareaStyled = styled.textarea`
  padding: 0.8rem;
  font-size: 1.6rem;
  width: 100%;
  min-height: 8rem;
  max-height: 20rem;
  resize: vertical;

  border-radius: 0px 0px 3px 3px;
  border-left: solid 1px ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border-right: solid 1px ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border-top: solid 1px ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border-bottom: solid 3px ${({ theme }) => theme.colors.GRAY.hex_696969};
  background-color: ${({ theme }) => theme.colors.GRAY.hex_f2f2f2};

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.GRAY.hex_A2A2A2};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    background-color: transparent;
  }

  &:not(:placeholder-shown) {
    background-color: transparent;
  }

  &.has-error {
    border-bottom-color: ${({ theme }) => theme.colors.RED.hex_EB5757};
  }
  &.has-error:placeholder-shown {
    background-color: ${({ theme }) => theme.colors.RED.hex_FFEBEE};
    &::placeholder {
      color: ${({ theme }) => theme.colors.RED.hex_FFB4B4};
    }
  }
`;

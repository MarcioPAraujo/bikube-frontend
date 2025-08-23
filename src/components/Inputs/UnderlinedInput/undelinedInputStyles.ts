import styled from 'styled-components';

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  &.PASSWORD {
    input {
      padding-right: 3.5rem;
    }
  }

  .error-icon {
    position: absolute;
    right: 1rem;
    bottom: 0.75rem;
  }
`;
export const Label = styled.label`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
`;
export const Undelined = styled.input`
  padding: 0rem 0.8rem;
  font-size: 1.6rem;
  width: 100%;
  height: 4rem;

  border-radius: 3px;
  border-left: none;
  border-right: none;
  border-top: none;
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
    padding-right: 4rem;

    &::placeholder {
      color: ${({ theme }) => theme.colors.RED.hex_FFB4B4};
    }
  }
`;

export const EyButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;

  position: absolute;
  bottom: 0.2rem;
  right: 0.6rem;

  border: none;
  background: none;
`;

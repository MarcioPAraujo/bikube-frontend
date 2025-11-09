import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;
  width: 100%;
`;
export const Label = styled.p`
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 1.6rem;
`;
export const SelectArea = styled.div`
  position: relative;
`;
export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  border-radius: 0.8rem;
  padding-left: 0.8rem;
  background-color: ${({ theme }) => theme.colors.WHITE};
  color: ${({ theme }) => theme.colors.BLACK};
  height: 3.6rem;

  &.disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    span {
      color: ${({ theme }) => theme.colors.GRAY.hex_696969};
    }
  }

  &.opened {
    border-radius: 0.8rem 0.8rem 0px 0px;
  }
  svg.opened {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
    margin-right: 1.6rem;
  }
  svg.closed {
    transform: rotate(0deg);
    transition: transform 0.3s ease;
    margin-right: 1.6rem;
  }
`;
export const SelectedOption = styled.span`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.BLACK};
`;
export const Placeholder = styled.span`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
`;
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
`;
export const Input = styled.input`
  font-size: 1.6rem;
  width: 92%;
  border: none;
  background-color: transparent;
  height: 100%;
  color: ${({ theme }) => theme.colors.BLACK};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  }
`;
export const ErrorMessage = styled.span`
  position: absolute;
  bottom: -1.5rem;
  color: ${({ theme }) => theme.colors.RED.hex_D32F2F};
  font-size: 1.2rem;
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  font-size: 1.125rem;
  gap: 0.5rem;

  font-size: 1.6rem;
`;
export const Label = styled.label`
  cursor: pointer;
  align-self: start;
  display: flex;
  flex-direction: row;
  position: relative;
  transition: color 0.2s ease-in-out;

  &.disabled {
    cursor: default;
  }
`;
export const CheckboxContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  &:has(input:checked) {
    & > svg {
      opacity: 1;
    }
  }

  svg {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    pointer-events: none;
  }
`;
export const Checkbox = styled.input`
  cursor: pointer;
  appearance: none;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  border-radius: 0.5rem;

  transition: all 0.2s ease-in-out;
  &:checked {
    transition: all 0.2s ease-in-out;
    background-color: ${({ theme }) => theme.colors.GREEN.hex_018D1F};
    border: 1px solid ${({ theme }) => theme.colors.GREEN.hex_018D1F};
  }
  &:disabled {
    cursor: default;
  }
`;

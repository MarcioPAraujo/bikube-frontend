import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Description = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;

export const Content = styled.div`
  align-self: center;
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  width: clamp(30rem, 100%, 70rem);
  gap: 1.8rem;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  cursor: pointer;

  & > div {
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
  }

  &:has(input:checked) {
    & > div > svg {
      opacity: 1;
    }
  }

  & > div > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0;
  }
`;

export const CheckboxInput = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_919191};
  border-radius: 0.2rem;
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.GREEN.hex_018D1F};
    border: 1px solid ${({ theme }) => theme.colors.GREEN.hex_018D1F};
  }
`;

export const Fields = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 1fr);

  & > :first-child,
  & > :nth-child(4),
  & > :last-child {
    grid-column: span 2;
  }
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.RED.hex_FFEBEE};
    svg path {
      fill: ${({ theme }) => theme.colors.RED.hex_D32F2F};
    }
  }
`;

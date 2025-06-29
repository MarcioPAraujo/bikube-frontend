import styled from 'styled-components';

export const Options = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0px 0px 0.5rem 0.5rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;
export const OptionsContainer = styled.div`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: none;
  background-color: transparent;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  }
`;

export const OptionLabel = styled.label`
  font-size: 1.6rem;
  display: block;
  color: ${({ theme }) => theme.colors.GRAY.hex_999999};
  padding: 1rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  }
  &.selected {
    color: ${({ theme }) => theme.colors.BLACK};
  }
`;

export const RadioInput = styled.input`
  display: none;
`;
